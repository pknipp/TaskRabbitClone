
const dataDiv = document.getElementById("dataDiv");
const jobTypeId = dataDiv.dataset.jobtype;
const userId = dataDiv.dataset.user;
const name = dataDiv.dataset.name;
console.log(jobTypeId, userId, name);
const sortButton = document.getElementById("sort-button");

if (userId !== undefined) {
    let namespan = document.createElement("span")
    namespan.innerHTML = `Hi ${name}!`
    document.getElementById("account").prepend(namespan)
    document.getElementById("accountactions").innerHTML = "Manage account"
    document.getElementById("register").href = `/users/${userId}`
  } else {
    document.getElementById("logoutbox").classList.add("hidden");
  }

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

            let buttonDiv = document.createElement("div")
            buttonDiv.innerHTML = `<button class="create-job" value="${tasker.id}">Select & Continue</button>`;

            taskerContainer.appendChild(nameDiv);
            taskerContainer.appendChild(skillDiv);
            taskerContainer.appendChild(priceDiv);
            taskerContainer.appendChild(buttonDiv);

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

taskersContainer.addEventListener("click", async (e) => {
    if(e.target.nodeName === "BUTTON") {
        let taskerId = e.target.value;
        console.log(taskerId);
    }
})

document.getElementById("logoutbox").addEventListener('click', async() => {
    const res = await fetch('/api/users/session', {
      method: "DELETE",
    })
});
