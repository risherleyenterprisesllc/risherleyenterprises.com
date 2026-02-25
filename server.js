const express = require("express");
const Stripe = require("stripe");
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

/* ===== COLOR SUPPORT ===== */
const supportsColor = process.stdout.isTTY;

const colors = supportsColor ? {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
} : {
  reset: "",
  gray: "",
  red: "",
  green: "",
  yellow: "",
  blue: "",
  magenta: "",
  cyan: "",
};

/* ===== LOGGER ===== */
function log(type, message) {
  const time = new Date().toISOString().replace("T", " ").split(".")[0];

  let color = colors.gray;

  switch (type) {
    case "INFO":
      color = colors.green;
      break;
    case "REQUEST":
      color = colors.cyan;
      break;
    case "AUTH":
      color = colors.blue;
      break;
    case "STRIPE":
      color = colors.magenta;
      break;
    case "CART":
      color = colors.yellow;
      break;
    case "WARN":
      color = colors.yellow;
      break;
    case "ERROR":
      color = colors.red;
      break;
  }

  console.log(
    `${colors.gray}[${time}]${colors.reset} ` +
    `${color}[${type}]${colors.reset}: ` +
    `${message}`
  );
}

/* ===== APP INIT ===== */
log("INFO", "Starting server...");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

log("INFO", "Stripe initialized");

/* ===== FIREBASE ADMIN ===== */
try {
  const serviceAccount = require("./firebase-service-account.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  log("INFO", "Firebase Admin initialized");
} catch (err) {
  log("ERROR", "Failed to initialize Firebase Admin");
  log("ERROR", err.message);
  process.exit(1);
}

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(express.static("public"));

log("INFO", "Middleware loaded");

/* ===== ROUTES ===== */
app.post("/checkout", async (req, res) => {
  log("REQUEST", "POST /checkout received");

  try {
    const { items, firebaseToken } = req.body;

    if (!firebaseToken) {
      log("WARN", "Missing Firebase token");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 🔐 Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const uid = decoded.uid;
    log("AUTH", `Firebase token verified (uid=${uid})`);

    // 🧾 Product catalog (SERVER TRUSTED)
    const products = {
      consulting: { name: "Consulting", price: 100 },
      management: { name: "Project Management", price: 150 },
    };

    // 🛒 Build line items
    const lineItems = [];

    for (const item of items) {
      const product = products[item.id];

      if (!product) {
        log("ERROR", `Invalid product ID: ${item.id}`);
        return res.status(400).json({ error: "Invalid product" });
      }

      log("CART", `Item added: ${product.name} x${item.qty}`);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.price * 100,
        },
        quantity: item.qty,
      });
    }

    // 💳 Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/cart.html",
      metadata: { uid },
    });

    log("STRIPE", `Checkout session created (${session.id})`);

    res.json({ url: session.url });
  } catch (err) {
    log("ERROR", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ===== SERVER START ===== */
const PORT = 3000;
app.listen(PORT, () => {
  log("INFO", `Server running at http://localhost:${PORT}`);
});