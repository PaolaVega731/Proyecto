const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      username: document.querySelector("#username").value
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/register", opts);
    response = await response.json()
    alert(response.message)
    response.session && location.replace("/login")
  } catch (error) {
    alert(error.message);
  }
});
