const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.userid;

document.getElementById("logoutbox").addEventListener('click', async() => {
  console.log("Logout button was clicked.");
  const res = await fetch('/api/users/session', {
    method: "DELETE",
  });
})

// const form = document.getElementById("jobtype-form");
// form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const formData = new FormData(form);
//     const jobtypeid = formData.get("jobTypeId");
//     window.location.href = `/jobtypes/${jobtypeid}`

//     const jobTypes = await JobType.findAll();
// });
