

const getJobTypes = async () => {
  const res = await fetch('/api/jobtypes/');
  let jobTypes = await res.json();
  console.log(jobTypes);
  let jobTypesContainer = document.getElementById("jobTypesContainer");
    if(res.ok) {
        jobTypes.forEach(jobType => {
            let jobTypeContainer = document.createElement("div");
            let jobTypeImg = document.createElement("img");
            jobTypeImg.src = `public/jobtypeimages/${jobType.name}.svg`
            jobTypeContainer.classList.add("jobType");
            let nameDiv = document.createElement("div");
            nameDiv.classList.add("namediv")
            let nameLink = document.createElement("a");
            let subtext = document.createElement("span");
            subtext.innerHTML = "Receiveth thy bidding done!"
            nameLink.innerHTML = `Hire a ${jobType.name}!`;
            nameLink.href =`/jobtypes/${jobType.id}`
            nameDiv.appendChild(nameLink);
            jobTypeContainer.appendChild(jobTypeImg)
            jobTypeContainer.appendChild(nameDiv);
            jobTypeContainer.appendChild(subtext);
            jobTypesContainer.appendChild(jobTypeContainer);

        })
    }

}

getJobTypes();
const form = document.getElementById("jobtype-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Yo whaddup");
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
