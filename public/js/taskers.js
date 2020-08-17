const dataDiv = document.getElementById("dataDiv");
const jobTypeId = dataDiv.dataset.jobtype;
const userId = dataDiv.dataset.user;
const name = dataDiv.dataset.name;
const _csrf = dataDiv.dataset.csrf;
console.log("dataDiv = ", dataDiv);
const sortButton = document.getElementById("sort-button");

if (userId !== undefined) {
    let namespan = document.createElement("span")
    namespan.innerHTML = `Hi ${name ? name : "there"}!`
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
            nameDiv.innerHTML = `${tasker.name}`;
            nameDiv.classList.add("nameDiv");

            let skillDiv = document.createElement("div")
            skillDiv.innerHTML= "Skill:    "
            let skill = tasker.skill;
            while(skill > 0) {
                let star = document.createElement("img")
                star.setAttribute("src", "/public/star-icon.svg");
                star.setAttribute("width", "5%")
                star.style.marginBottom = "2px";
                skillDiv.appendChild(star);
                skill--;
            }
            skillDiv.classList.add("skillDiv");

            let priceDiv = document.createElement("div")
            priceDiv.innerHTML = `<div>Price/Day:</div><div style="font-size: 25px; margin-top: 5px"> ${tasker.price} Pence</div>`;
            priceDiv.classList.add("priceDiv")

            let buttonDiv = document.createElement("div")
            buttonDiv.innerHTML = `<button class="create-job" value="${tasker.id}">Select & Continue</button>`;
            buttonDiv.classList.add("buttonDiv")

            let picDiv = document.createElement("div");
            picDiv.classList.add("picDiv");
            let pic = document.createElement("img");
            pic.setAttribute("src", `/public/jobtypeimages/${tasker.JobType.name}.svg`)
            pic.setAttribute("height", "90%");
            pic.classList.add("picture");
            picDiv.appendChild(pic);

            taskerContainer.appendChild(picDiv);
            taskerContainer.appendChild(priceDiv);
            taskerContainer.appendChild(nameDiv);
            taskerContainer.appendChild(skillDiv);
            taskerContainer.appendChild(buttonDiv);


            // add individual tasker to taskers container
            taskersContainer.appendChild(taskerContainer);
        })
        let pageTitleHeader = document.getElementById("pageTitle");
        let pageTitle = (taskers[0].JobType.name === "Mercenary") ? "Mercenaries" :
                        (taskers[0].JobType.name === "Watchman") ? "Watchmen" :
                        taskers[0].JobType.name + "s";
        pageTitleHeader.innerHTML = pageTitle;
    }
}

getTaskers(jobTypeId);

sortButton.addEventListener("change", async e => {
    let val = sortButton.value;
    getTaskers(jobTypeId, val)
})

document.getElementById("logoutbox").addEventListener('click', async() => {
    const res = await fetch('/api/users/session', {
      method: "DELETE",
    })
});

let pageLogo = document.querySelector(".page-header-logo");

pageLogo.addEventListener("click", e => {
    window.location.href = "/home";
})

function getNewDate() {
    const date = new Date()
    const year = date.getFullYear().toString();
    // Normally zero indexed
    const monthNum = (date.getMonth() + 1);
    const month = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
    const day = date.getDate().toString();
    let fullDate = `${year}-${month}-${day}`
    return fullDate;
}

taskersContainer.addEventListener("click", async (e) => {
    if(e.target.nodeName === "BUTTON") {
        if(!userId) {
            window.location.href = "/users/register";
            alert("You must be logged in to create a new job");
            return;
        }
        let taskerId = e.target.value;
        const buttonDiv = e.target.parentElement;
        let detailInput = document.createElement("input");
        detailInput.setAttribute("type", "textArea");
        detailInput.classList.add("details")
        detailInput.setAttribute("placeholder", "Please specify job details");
        let confirmButton = document.createElement("button");
        confirmButton.innerHTML = "Confirm";
        confirmButton.classList.add("confirm")

        buttonDiv.innerHTML = "";
        buttonDiv.appendChild(detailInput);
        buttonDiv.appendChild(confirmButton);
        confirmButton.addEventListener("click", async (e) => {
            const details = detailInput.value;
            const jobDate = getNewDate();
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, taskerId, details, jobDate, _csrf })
            })
            if(res.ok) {
                window.location.href = `/jobs/${userId}`;
            }
        }
    )}
})
