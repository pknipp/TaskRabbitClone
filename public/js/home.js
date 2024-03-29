const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.user;
const name = dataDiv.dataset.name;

if (userId !== undefined) {
  let namespan = document.createElement("span")
  namespan.innerHTML = `Hi ${(name) ? name : "there"}!`
  document.getElementById("account").prepend(namespan)
  document.getElementById("accountactions").innerHTML = "Manage account"
  document.getElementById("register").href = `/users/${userId}`
} else {
  document.getElementById("logoutbox").classList.add("hidden");
}



const getJobTypes = async () => {
  const res = await fetch('/api/jobtypes/');
  let jobTypes = await res.json();
  let jobTypesContainer = document.getElementById("jobTypesContainer");
    if(res.ok) {
        jobTypes.forEach(jobType => {
            let jobTypeContainer = document.createElement("div");
            let jobTypeLink = document.createElement("a");
            let jobTypeImg = document.createElement("img");
            jobTypeImg.src = `public/jobtypeimages/${jobType.name}.svg`
            jobTypeContainer.classList.add("jobType");
            let nameDiv = document.createElement("div");
            nameDiv.classList.add("namediv")
            let nameLink = document.createElement("div");
            let subtext = document.createElement("span");
            subtext.innerHTML = "Receiveth thy bidding done!"
            nameLink.innerHTML = `Hire a ${jobType.name}!`;
            jobTypeLink.href =`/jobtypes/${jobType.id}`
            jobTypeContainer.appendChild(jobTypeLink);
            jobTypeLink.appendChild(jobTypeImg)
            jobTypeLink.appendChild(nameDiv);
            jobTypeLink.appendChild(subtext);
            nameDiv.appendChild(nameLink);
            jobTypesContainer.appendChild(jobTypeContainer);


        })
    }

}

getJobTypes();
const form = document.getElementById("jobtype-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const jobtypeid = formData.get("jobTypeId");
    // const res = await fetch(`/api/jobtypes/${jobtypeid}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ jobtype })
    // })
    // const data = await res.json();
    // if(!res.ok) {
    //     const { message } = data;
    //     const errorsContainer = document.getElementById("errors-container");
    //     errorsContainer.innerHTML = message;
    //     return;
    // }
    window.location.href = `/jobtypes/${jobtypeid}`

    const jobTypes = await JobType.findAll();
});

document.getElementById("logoutbox").addEventListener('click', async() => {
  const res = await fetch('/api/users/session', {
    method: "DELETE",
  });

})
