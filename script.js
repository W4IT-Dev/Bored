document.querySelector('.item').focus();
const type = document.querySelector('#type')
const priceRange = document.querySelector('#priceRange')
const accRange = document.querySelector('#accRange')
const partRange = document.querySelector('#partRange')
const priceRangeValue = document.querySelector('#priceRangeValue')
const accRangeValue = document.querySelector('#accRangeValue')
const partRangeValue = document.querySelector('#partRangeValue')

document.addEventListener('keydown', e => {
  if (e.key == "Enter" && document.activeElement.id != "gen") return document.activeElement.lastElementChild.focus();
  if (e.key == "ArrowDown") nav(1, '.item')
  if (e.key == "ArrowUp") nav(-1, '.item')
  if (e.key == "Enter") {
    // Define the API endpoint
    const apiUrl = ``;
    console.log(`https://www.boredapi.com/api/activity?type=${document.querySelector('select').value}${document.querySelector('#price').value}${document.querySelector('#acc').value}&participants=${document.querySelector('#part').value}`)
    // Make a GET request to the API
    fetch(`https://www.boredapi.com/api/activity?type=${document.querySelector('select').value}${document.querySelector('#price').value}${document.querySelector('#acc').value}&participants=${document.querySelector('#part').value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response)
        return response.json();
      })
      .then(data => {
        console.log(data);
        const element = document.getElementById("activity-result");
        document.querySelector('#result').style.display = "block"
        element.innerText = data.activity || 'Nothing found'
        if(!data.activity) return document.querySelector('#result-info').style.display = "none"
        
        type.innerText = "Type: " + data.type
        priceRange.value = data.price * 10
        accRange.value = data.accessibility * 10
        partRange.value = data.participants
        priceRangeValue.innerText = getPriceLabel(data.price);
        accRangeValue.innerText = getAccessibilityLabel(data.accessibility);
        partRangeValue.innerText = data.participants
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth"
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    function getPriceLabel(price) {
      if (price == 0) return "Free"
      if (price >= 0.5) return "Expensive"
      if (price >= 0.3) return "Affordable"
      if (price >= 0) return "Cheap"
    }

    function getAccessibilityLabel(accessibility) {
      if (accessibility == 0) return "Accessible"
      if (accessibility >= 0.8) return "Hardly accessible"
      if (accessibility >= 0.6) return "Moderately accessible"
      if (accessibility == 0.3) return "Fairly accessible"
      if (accessibility >= 0) return "Easily accessible"
    }

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

for (let i = 0; i < allSelectElems.length; i++) {
  allSelectElems[i].addEventListener('blur', () => {
    allSelectElems[i].parentElement.focus();
  });
}