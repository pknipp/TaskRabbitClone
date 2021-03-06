const form = document.querySelector('#signup-form');
const errorsContainer = document.querySelector("#errors-container");

form.addEventListener('submit', async (e) => {
  console.log('submitting');
  e.preventDefault();
  const formData = new FormData(form);
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const phone = (!!formData.get('phone')) ? formData.get('phone'): null;
  const password = formData.get('password');
  const password2 = formData.get('password2');
  const _csrf = formData.get('_csrf');

  const body = { firstName, lastName, email, phone, password, password2, _csrf };
  errorsContainer.innerHTML = '';
  const res = await fetch('/api/users/signup', {
    method: "POST",
    body: JSON.stringify(body),
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
