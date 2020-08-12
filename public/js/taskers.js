const dataDiv = document.getElementById("dataDiv");
const jobTypeId = dataDiv.dataset.job;

const getTaskers = async (jobTypeId) => {
    const taskers = await fetch(`/api/jobTypes/${jobTypeId}`);

}
