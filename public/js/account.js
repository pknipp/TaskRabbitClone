const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.userid;

document.getElementById("logoutbox").addEventListener('click', async() => {
  console.log("Logout button was clicked.");
  const res = await fetch('/api/users/session', {
    method: "DELETE",
  });
})

document.querySelector(".page-header-logo").addEventListener("click", e => window.location.href = "/home")
