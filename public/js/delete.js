const form = document.querySelector('#signup-form');
const errorsContainer = document.querySelector("#errors-container");

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const _csrf = formData.get("_csrf");
  errorsContainer.innerHTML = '';
  console.log("about to fetch");
  console.log("formData.get(_csrf) = ", _csrf);
  const res = await fetch('/api/users/delete', {
    method: "DELETE",
    body: JSON.stringify({_csrf: formData.get('_csrf')}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("done fetch, but before res.json");
  const data = await res.json();
  console.log("res.ok equal ", res.ok);
  if (!res.ok) {
    const { message, errors } = data;
    for (let error of errors) {
      const errorLi = document.createElement('li');
      errorLi.innerHTML = error;
      errorsContainer.appendChild(errorLi);
    }
    return;
  }

  window.location.href = '/home';
});
