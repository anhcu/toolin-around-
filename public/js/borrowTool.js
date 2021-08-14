// Logic to borrow a tool

// Borrow button displayed on tools/id
const borrowBtn = document.querySelector('#borrow');

const mailTest = async (event) => {
    event.preventDefault();

    // Grabs id from current page
    const tool_id = parseInt(document.location.href.split("/").pop());

    // SEND POST REQUEST AT API ENDPOINT
    const response = await fetch(`/api/borrow/${tool_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({}),
        mode: 'no-cors',
    });
    
    const data = await response.json();

    // LET USER KNOW THE REQUEST EMAIL HAS SENT
    const borrowBtnDiv = document.querySelector('#borrow-btn-div');
    let emailSentMsg = document.createElement("p");
    emailSentMsg.setAttribute("id", "email-sent");
    emailSentMsg.setAttribute("class", "p-size");
    emailSentMsg.textContent = `Email sent! Please keep an eye on your email to coordinate with your neighbor.`;
    borrowBtnDiv.prepend(emailSentMsg);

}

borrowBtn.addEventListener('click', mailTest);