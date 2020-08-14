const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.user;

document.getElementById("logoutbox").addEventListener('click', async() => {
  console.log("Logout button was clicked.");
  const res = await fetch('/api/users/session', {
    method: "DELETE",
  });

})
