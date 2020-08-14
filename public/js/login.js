
const form = document.getElementById("login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const _csrf = formData.get("_csrf");
    const body = { email, password, _csrf }
    const res = await fetch('/api/users/token', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if(!res.ok) {
        const { message } = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        return;
    }
    window.location.href = "/home"
})
