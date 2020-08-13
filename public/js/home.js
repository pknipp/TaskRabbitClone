

const getJobTypes = async () => {
  const res = await fetch('/api/jobtypes/');
  let jobTypes = await res.json();
  console.log(jobTypes);
  let jobTypesContainer = document.getElementById("jobTypesContainer");
    if(res.ok) {
        jobTypes.forEach(jobType => {
            let jobTypeContainer = document.createElement("div");
            jobTypeContainer.classList.add("jobType");
            let nameDiv = document.createElement("div");
            nameDiv.innerHTML = `Hire a ${jobType.name}!`;
            jobTypeContainer.appendChild(nameDiv);
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
