
const dataDiv = document.getElementById("dataDiv");
const jobTypeId = dataDiv.dataset.jobtype;
console.log(jobTypeId);
const sortButton = document.getElementById("sort-button");

const getTaskers = async (jobTypeId, sort) => {
    let sortManager = sort ? `/${sort}` : "";
    const res = await fetch(`/api/jobtypes/${jobTypeId}${sortManager}` );
    let taskers = await res.json();

    let taskersContainer = document.getElementById("taskersContainer");
    if(res.ok) {
        taskersContainer.innerHTML = "";
        taskers.forEach(tasker => {
            let taskerContainer = document.createElement("div");
            taskerContainer.classList.add("tasker");

            let dateDiv = document.createElement("div");
            dateDiv.innerHTML = `Name: ${tasker.name}`;
            taskerContainer.appendChild(nameDiv);

            // add individual job to jobs container
            jobsContainer.appendChild(jobContainer);

        })
        let pageTitleHeader = document.getElementById("pageTitle");
        let pageTitle = taskers[0].JobType.name + "s";
        pageTitleHeader.innerHTML = pageTitle;
    }
}

getJobs(userId,0);

sortButton.addEventListener("change", async e => {
    let val = sortButton.value;
    getJs(userId, val)

})
