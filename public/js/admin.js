const deleteUserNode = document.getElementById("delete-user");
deleteUserNode.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(deleteTaskerNode);
    const _csrf = formData.get("_csrf");
    const userId = formData.get("userId");
//    console.log("formData is ",formData);
//    console.log("public/js/admin.js thinks that userId = ", userId);
    const res = await fetch("/api/admin/deleteUser", {
        method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId, _csrf})
    })
    const data = await res.json();
    if(!res.ok) {
        const {message} = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        errorsContainer.style.display = "Oops.  Something didn't work.";
        return;
    }
    window.location.href = "/home"
})

const deleteJobNode = document.getElementById("delete-job");
deleteJobNode.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(deleteJobNode);
    const _csrf = formData.get("_csrf");
    const jobId = formData.get("jobId");
    const res = await fetch("/api/admin/deleteJob", {
        method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({jobId, _csrf})
    })
    const data = await res.json();
    if(!res.ok) {
        const {message} = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        errorsContainer.style.display = "Oops.  Something didn't work.";
        return;
    }
    window.location.href = "/home"
})


const deleteTaskerNode = document.getElementById("delete-tasker");
deleteTaskerNode.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(deleteTaskerNode);
    const _csrf = formData.get("_csrf");
    const taskerId = formData.get("taskerId");
    const res = await fetch("/api/admin/deleteTasker", {
        method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({taskerId, _csrf})
    })
    const data = await res.json();
    if(!res.ok) {
        const {message} = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        errorsContainer.style.display = "Oops.  Something didn't work.";
        return;
    }
    window.location.href = "/home"
})

const deleteJobTypeNode = document.getElementById("delete-jobtype");
deleteJobTypeNode.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(deleteJobTypeNode);
    const _csrf = formData.get("_csrf");
    const jobTypeId = formData.get("jobTypeId");
    const res = await fetch("/api/admin/deleteJobType", {
        method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({jobTypeId, _csrf})
    })
    const data = await res.json();
    if(!res.ok) {
        const {message} = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        errorsContainer.style.display = "Oops.  Something didn't work.";
        return;
    }
    window.location.href = "/home"
})
