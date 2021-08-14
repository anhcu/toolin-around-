// Logic to perform a search

const searchHandler = async (event) => {
    event.preventDefault();
  
    // Gets value from form
    const search = document.querySelector('#search').value.trim();

    // GRAB THE HOMEPAGE FILEPATH ONLY, REMOVING ANY ADDITIONAL ROUTES (I.E. /USERS ETC) FROM URL
    const home_url = document.location.href.split("/").slice(0,3).join('/')

    // GET REQUEST AT API ENDPOINT FOR SEARCH TERM
    if (search) {
      const response = await fetch(`${home_url}/${search}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // IF SUCCESSFUL, REDIRECT TO SEARCHED RESULTS PAGE
        document.location.replace(`${home_url}/${search}`);
      } else {
        alert(response.statusText);
      }
    }
  };

// CLICK EVENT LISTENER FOR SEARCH BAR
document
  .querySelector('#search-form')
  .addEventListener('submit', searchHandler)