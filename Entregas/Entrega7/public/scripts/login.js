const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/login", opts);
    response = await response.json()
    alert(response.message)
    response.session && location.replace("/")
  } catch (error) {
    alert(error.message);
  }
});
