const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.userid;

const picDiv = document.getElementsByClassName("picDiv")[0];
console.log(picDiv);
const pic = document.createElement("img");
pic.setAttribute("src", "/public/images/misc/avatar.png");
pic.setAttribute("height", "90%");
pic.classList.add("picture");
picDiv.appendChild(pic);

document.getElementById("logoutbox").addEventListener('click', async() => {
  console.log("Logout button was clicked.");
  const res = await fetch('/api/users/session', {
    method: "DELETE",
  });
})

document.querySelector(".page-header-logo").addEventListener("click", e => window.location.href = "/home")
