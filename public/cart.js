async function checkout(cartItems) {
  const user = firebase.auth().currentUser;
  const token = await user.getIdToken();

  const res = await fetch("/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseToken: token,
      items: cartItems
    })
  });

  const data = await res.json();
  window.location.href = data.url;
}