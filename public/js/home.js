const form = document.getElementById("jobtype-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const jobtypeid = formData.get("jobTypeId");
    // const res = await fetch(`/api/jobtypes/${jobtypeid}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ jobtype })
    // })
    // const data = await res.json();
    if(!res.ok) {
        const { message } = data;
        const errorsContainer = document.getElementById("errors-container");
        errorsContainer.innerHTML = message;
        return;
    }
    window.location.href = `/jobtypes/${jobtypeid}`
});
