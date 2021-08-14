// Deletes a TOOL
const deleteToolHandler = async (event) => {
    event.preventDefault();
    
    // GRAB TOOL ID FROM URL
    const id = parseInt(document.location.href.split("/").pop());

    // DELETE REQUEST AT API ENDPOINT
    const res = await fetch(`/api/tools/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        document.location.replace('/toolbox');

    } else {
        alert(res.statusText);
    }
};

document.querySelector('.delete-tool').addEventListener('submit', deleteToolHandler);