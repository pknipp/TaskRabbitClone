
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

            let nameDiv = document.createElement("div");
            nameDiv.innerHTML = `Name: ${tasker.name}`;

            let skillDiv = document.createElement("div")
            skillDiv.innerHTML = `Skill: ${tasker.skill}`;

            let priceDiv = document.createElement("div")
            priceDiv.innerHTML = `Price: ${tasker.price}`;

            taskerContainer.appendChild(nameDiv);
            taskerContainer.appendChild(skillDiv);
            taskerContainer.appendChild(priceDiv);

            // add individual tasker to taskers container
            taskersContainer.appendChild(taskerContainer);

        })
        let pageTitleHeader = document.getElementById("pageTitle");
        let pageTitle = taskers[0].JobType.name + "s";
        pageTitleHeader.innerHTML = pageTitle;
    }
}

getTaskers(jobTypeId);

sortButton.addEventListener("change", async e => {
    let val = sortButton.value;
    getTaskers(jobTypeId, val)


})
