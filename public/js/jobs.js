
const dataDiv = document.getElementById("dataDiv");
// delete following after Simon sees destruction of case-sensitivity
console.log(dataDiv);
console.log(dataDiv.dataset);
console.log(dataDiv.dataset.userid);
const userId = dataDiv.dataset.userid;
const sortButton = document.getElementById("sort-button");

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
            dateDiv.innerHTML = `Date scheduled: ${job.jobDate}`;
            // dateDiv.innerHTML = `Date scheduled: ${job.Jobs.jobDate}`;
            jobContainer.appendChild(dateDiv);

            let taskerDiv = document.createElement("div");
            taskerDiv.innerHTML = `Tasker: ${job.Tasker.name}`;
            // taskerDiv.innerHTML = `Tasker: ${job.name}`;
            jobContainer.appendChild(taskerDiv);

            let priceDiv = document.createElement("div");
            priceDiv.innerHTML = `Price: ${job.Tasker.price}`;
//            priceDiv.innerHTML = `Price: ${job.price} and Type: ${job.JobTypes.name}`
            jobContainer.appendChild(priceDiv);

            let detailsDiv = document.createElement("div");
            detailsDiv.innerHTML = `Details: ${job.details}`;
            // detailsDiv.innerHTML = `Details: ${job.Jobs.details}`;
            jobContainer.appendChild(detailsDiv);

            // add individual job to jobs container
            jobsContainer.appendChild(jobContainer);

        })
        let pageTitleHeader = document.getElementById("pageTitle");
        let pageTitle = jobs[0].User.firstName + " " + jobs[0].User.lastName + "'s jobs";
        pageTitleHeader.innerHTML = pageTitle;
    }
}

getJobs(userId, 0);

sortButton.addEventListener("change", async e => {
    let sort = sortButton.value;
    getJobs(userId, sort)
})
