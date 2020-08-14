const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.job;

const getJobs = async (userId, sort) => {
  const res = await fetch(`/api/jobs/${userId}/${sort}` );
  let jobs = await res.json()
  let jobsContainer = document.getElementById("jobsTBody");
  if(res.ok) {
    jobsContainer.innerHTML = "";
    jobs.forEach(job => {
      let jobContainer = document.createElement("tr");
      jobContainer.classList.add("job")

      let dateTd = document.createElement("td");
      dateTd.innerHTML = `${job.jobDate}`;
      jobContainer.appendChild(dateTd)

      let taskerNameTd = document.createElement("td");
      taskerNameTd.innerHTML = `${job.Tasker.name}`;
      jobContainer.appendChild(taskerNameTd)

      let taskerPriceTd = document.createElement("td");
      taskerPriceTd.innerHTML = `${job.Tasker.price}`;
      jobContainer.appendChild(taskerPriceTd)

      let detailsTd = document.createElement("td");
      detailsTd.innerHTML = `${job.details}`;
      jobContainer.appendChild(detailsTd)

      jobsContainer.appendChild(jobContainer);
    })
    document.getElementById("pageTitle").innerHTML = `${jobs[0].User.firstName} ${jobs[0].User.lastName}'s jobs`
  }
}

getJobs(userId, 0);

document.getElementById("thead").addEventListener("click", async e => {
    getJobs(userId, e.target.id);
})
