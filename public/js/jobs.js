//This was copied by PK from taskers.js before modification

const dataDiv = document.getElementById("dataDiv");
const userId = dataDiv.dataset.job;

const getJobs = async (userId) => {
//let sortManager = sort ? `/${sort}` : "";
  const res = await fetch(`/api/jobs/${userId}` );
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
    let pageTitleHeader = document.getElementById("pageTitle");
    let pageTitle = `${jobs[0].User.firstName} ${jobs[0].User.lastName}'s jobs`
    pageTitleHeader.innerHTML = pageTitle;
  }
}

getJobs(userId);

const headNode = document.getElementById("thead");

headNode.addEventListener("click", async e => {
    const sortBy = e.target.id;
// //    let val = sortButton.value;
//     getJobs(jobId)
})
