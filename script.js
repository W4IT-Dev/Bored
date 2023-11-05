document.querySelector('.item').focus();


document.addEventListener('keydown', e => {
  if (e.key == "Enter" && document.activeElement.id != "gen") return document.activeElement.lastElementChild.focus();
  if (e.key == "ArrowDown") nav(1, '.item')
  if (e.key == "ArrowUp") nav(-1, '.item')
  if (e.key == "Enter") {
    // Define the API endpoint
    const apiUrl = `https://www.boredapi.com/api/activity?type${document.querySelector('select').value}&${document.querySelector('#price').value}&${document.querySelector('#acc').value}&participants=${document.querySelector('#part').value}`;
    // Make a GET request to the API
    console.log(apiUrl)
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        document.querySelector('#result').innerText = data.activity || 'Nothing found'
        const element = document.getElementById("result");
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth"
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }
})

function nav(move, elems) {
  const currentIndex = document.activeElement;
  const items = document.querySelectorAll(elems);
  let currentElemIdx = [...items].indexOf(currentIndex);
  const next = currentElemIdx + move;
  const targetElement = items[next];
  if (targetElement) targetElement.focus();
}

window.onerror = function (message, source, lineno, colno, error) {
  // Handle the error here
  console.error('Error Message: ' + message);
  console.error('Source: ' + source);
  console.error('Line Number: ' + lineno);
  console.error('Column Number: ' + colno);

  // You can also log the error object if it's available
  if (error) {
    console.error('Error Object:', error);
  }

  // Return true to prevent the default browser error handling
  return true;
};
let allSelectElems = document.querySelectorAll('select');

for(let i = 0; i < allSelectElems.length; i++) {
  allSelectElems[i].addEventListener('blur', () => {
    allSelectElems[i].parentElement.focus();
});
}