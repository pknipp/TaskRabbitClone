
const dataDiv = document.getElementById("dataDiv");
const jobTypeId = dataDiv.dataset.job;
let taskers;
const getTaskers = async (jobTypeId) => {
    const data = await fetch(`/api/jobtypes/${jobTypeId}`);
    taskers = await data.json();
    console.log(taskers)
}


getTaskers(jobTypeId);

console.log(taskers);

let taskersContainer = document.getElementById("taskersContainer");
if(taskers) {
    taskers.forEach(tasker => {
        let taskerContainer = document.createElement("div");
        taskerContainer.classList.add("tasker");
        let nameDiv = document.createElement("div");
        nameDiv.innerHTML = tasker.name;
        let skillDiv = document.createElement("div")
        skillDiv.innerHTML = tasker.skill;
        let priceDiv = document.createElement("div")
        priceDiv.innerHTML = tasker.skill;
        taskerContainer.appendChild(nameDiv);
        taskerContainer.appendChild(skillDiv);
        taskerContainer.appendChild(priceDiv);

        // add individulal tasker to taskers container
        taskersContainer.appendChild(taskerContainer);

    })
}
