document.querySelector('input').focus();

document.addEventListener('keydown', e =>{
    if(e.key == "Enter") {
        // Define the API endpoint
const apiUrl = "";

// Make a GET request to the API
fetch("https://www.boredapi.com/api/activity?type="+document.querySelector('input').value)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the data, e.g., log the suggested activity
    console.log("Suggested Activity:", data.activity);
    document.querySelector('#result').innerText = data.activityG
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

    }
})