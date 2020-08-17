const form = document.querySelector('#signup-form');
const errorsContainer = document.querySelector("#errors-container");
const dataDiv = document.getElementById("dataDiv");
const id = dataDiv.dataset.id;
const _csrf = dataDiv.dataset.csrf;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const _csrf = formData.get("_csrf");
  errorsContainer.innerHTML = '';
  const res = await fetch('/api/users/delete', {
    method: "DELETE",
    body: JSON.stringify({_csrf: formData.get('_csrf')}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
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

document.getElementById("cancelDiv").addEventListener('click', async (e) => {
  e.preventDefault();
  window.location.href = `/users/${id}`;
//  window.location.href = `/home`;
});
