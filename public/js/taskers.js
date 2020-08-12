
const dataDiv = document.getElementById("dataDiv");
const jobTypeId = dataDiv.dataset.job;
const getTaskers = async (jobTypeId) => {
    const res = await fetch(`/api/jobtypes/${jobTypeId}`);
    let taskers = await res.json();

    let taskersContainer = document.getElementById("taskersContainer");
    if(res.ok) {
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

            // add individulal tasker to taskers container
            taskersContainer.appendChild(taskerContainer);

        })
        let pageTitleHeader = document.getElementById("pageTitle");
        let pageTitle = taskers[0].JobType.name + "s";
        pageTitleHeader.innerHTML = pageTitle;
    }
}

getTaskers(jobTypeId);

let sortButton = document.getElementById("sort-button");

sortButton.addEventListener("change", e => {
    let val = sortButton.value;
    // const res = await fetch(`/api/jobtypes/${jobTypeId}/${val}`);

    // console.log(value);
})
