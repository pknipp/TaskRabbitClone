const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.userid;
const firstName = dataDiv.dataset.firstname;
const _csrf = dataDiv.dataset.csrf;
const sortButton = document.getElementById("sort-button");

if (userId !== undefined) {
  let namespan = document.createElement("span")
  namespan.innerHTML = `Hi ${firstName}!`
  document.getElementById("account").prepend(namespan)
  document.getElementById("accountactions").innerHTML = "Manage account"
  document.getElementById("register").href = `/users/${userId}`
} else {
  document.getElementById("logoutbox").classList.add("hidden");
}

const getJobs = async (userId, sort) => {
  const res = await fetch(`/api/jobs/${userId}/${sort}` );
  let jobs = await res.json();
  let jobsContainer = document.getElementById("jobsContainer");
  if(res.ok) {
    jobsContainer.innerHTML = "";
    jobs.forEach(job => {
      let jobContainer = document.createElement("div");
      jobContainer.classList.add("job");

      let dateDiv = document.createElement("div");
      dateDiv.innerHTML = `Scheduled for ${job.jobDate}`;
      dateDiv.classList.add("dateDiv");
      jobContainer.appendChild(dateDiv);

      let taskerNameDiv = document.createElement("div");
      taskerNameDiv.innerHTML = `${job.Tasker.name}`;
      // taskerDiv.innerHTML = `Tasker: ${job.name}`;
      taskerNameDiv.classList.add("taskerNameDiv");
      jobContainer.appendChild(taskerNameDiv);

      let taskerSkillDiv = document.createElement("div");
      taskerSkillDiv.innerHTML = `Skill: ${job.Tasker.skill}`;
      // priceDiv.innerHTML = `Price: ${job.price} and Type: ${job.JobTypes.name}`
      taskerSkillDiv.classList.add("taskerSkillDiv");
      jobContainer.appendChild(taskerSkillDiv);

      let taskerPriceDiv = document.createElement("div");
      taskerPriceDiv.innerHTML = `Price: ${job.Tasker.price} pence/day`;
      // priceDiv.innerHTML = `Price: ${job.price} and Type: ${job.JobTypes.name}`
      taskerPriceDiv.classList.add("taskerPriceDiv");
      jobContainer.appendChild(taskerPriceDiv);

      let detailsDiv = document.createElement("div");
      detailsDiv.innerHTML = `Details: ${job.details}`;
      // detailsDiv.innerHTML = `Details: ${job.Jobs.details}`;
      detailsDiv.classList.add("detailsDiv");
      jobContainer.appendChild(detailsDiv);

      let picDiv = document.createElement("div");
      picDiv.classList.add("picDiv")
      let pic = document.createElement("img");
      pic.setAttribute("src", `/public/jobtypeidimages/${job.Tasker.jobTypeId}.svg`)
      pic.setAttribute("height", "90%");
      pic.classList.add("picture")
      picDiv.appendChild(pic)
      jobContainer.appendChild(picDiv);

      jobsContainer.appendChild(jobContainer);
    })

    let pageTitleHeader = document.getElementById("pageTitle");
    let pageTitle = jobs[0].User.firstName + " " + jobs[0].User.lastName + "'s jobs";
    pageTitleHeader.innerHTML = pageTitle;
  }
}

getJobs(userId, 0);

sortButton.addEventListener("change", async e => {
    let val = sortButton.value;
    getJobs(userId, val)
})

document.getElementById("logoutbox").addEventListener('click', async() => {
    const res = await fetch('/api/users/session', {
      method: "DELETE",
    })
});

document.querySelector(".page-header-logo").addEventListener("click", e => window.location.href = "/home")
