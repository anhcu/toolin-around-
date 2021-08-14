// Logic to log out a user

const logout = async () => {
  // DELETE REQUEST AT API ENDPOINT
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // IF SUCCESSFUL, REDIRECT TO LOGGED OUT HOMEPAGE
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// CLICK EVENT LISTENER FOR LOGOUT BUTTON
document.querySelector('#logout').addEventListener('click', logout);
