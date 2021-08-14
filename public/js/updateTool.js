// Logic to update a tool

const updateToolHandler = async (event) => {
    event.preventDefault();

    // Gets values from form
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const category_id = document.querySelector('#category').value.trim();
    const tool_id = parseInt(document.location.href.split("/").pop());

    if (name && description && category_id) {
    // PUT REQUEST AT API ENDPOINT TO UPDATE A TOOL WITH FORM DATA
    const res = await fetch(`/api/tools/${tool_id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description, category_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        // IF SUCCESSFUL, REDIRECT BACK TO THAT TOOL'S UPDATED PAGE
        document.location.replace(`/tools/${tool_id}`)
    } else {
        alert(res.statusText);
    }
    }
};

// CLICK EVENT LISTENER FOR UPDATE TOOL FORM
document
.querySelector('#update-tool').addEventListener('click', updateToolHandler);

// MATERIALIZE JQUERY FOR CATEGORY DROPDOWN SELECTION
$(document).ready(function(){
    $('select').formSelect();
});