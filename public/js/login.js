
const form = document.getElementById("login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const _csrf = formData.get("_csrf");
    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, _csrf })
    })
    const data = await res.json();
    if(!res.ok) {
        const { message } = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        errorsContainer.style.display = "block";
        return;
    }
    window.location.href = "/home"
})
