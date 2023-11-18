
document.querySelector('.item').focus();

let offlineActivities = localStorage.offlineActivities ? JSON.parse(localStorage.offlineActivities) : [
  {
    "activity": "Make a new friend",
    "type": "social",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "1000000",
    "accessibility": 0
  },
  {
    "activity": "Configure two-factor authentication on your accounts",
    "type": "busywork",
    "participants": 1,
    "price": 0,
    "link": "https://en.wikipedia.org/wiki/Multi-factor_authentication",
    "key": "1572120",
    "accessibility": 0
  },
  {
    "activity": "Play a video game",
    "type": "recreational",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "5534113",
    "accessibility": 0
  },
  {
    "activity": "Practice coding in your favorite lanaguage",
    "type": "recreational",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "7096020",
    "accessibility": 0.1
  },
  {
    "activity": "Clean out your garage",
    "type": "busywork",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "7023703",
    "accessibility": 0.1
  },
  {
    "activity": "Write a song",
    "type": "music",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "5188388",
    "accessibility": 0
  },
  {
    "activity": "Start a daily journal",
    "type": "relaxation",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "8779876",
    "accessibility": 0
  },
  {
    "activity": "Learn about a distributed version control system such as Git",
    "type": "education",
    "participants": 1,
    "price": 0,
    "link": "https://en.wikipedia.org/wiki/Distributed_version_control",
    "key": "9303608",
    "accessibility": 0
  },
  {
    "activity": "Create a meal plan for the coming week",
    "type": "cooking",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "3491470",
    "accessibility": 0
  },
  {
    "activity": "Make a to-do list for your week",
    "type": "busywork",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "5920481",
    "accessibility": 0.05
  },
  {
    "activity": "Organize your music collection",
    "type": "busywork",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "3151646",
    "accessibility": 0
  },
  {
    "activity": "Create a cookbook with your favorite recipes",
    "type": "cooking",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "1947449",
    "accessibility": 0.05
  },
  {
    "activity": "Make a bucket list",
    "type": "busywork",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "2735499",
    "accessibility": 0
  }
]

const result = document.querySelector('#result');
const resultActivity = document.querySelector('#activity-result');
const resultInfo = document.querySelector('#result-info');
const type = document.querySelector('#type');
const priceRange = document.querySelector('#priceRange');
const accRange = document.querySelector('#accRange');
const partRange = document.querySelector('#partRange');
const priceRangeValue = document.querySelector('#priceRangeValue');
const accRangeValue = document.querySelector('#accRangeValue');
const partRangeValue = document.querySelector('#partRangeValue');

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement.id !== 'gen') return document.activeElement.lastElementChild.focus();
  if (e.key === 'ArrowDown') nav(1, '.item');
  if (e.key === 'ArrowUp') nav(-1, '.item');
  if (e.key === 'Enter') {
    if (!navigator.onLine) {

    }
    const apiURL = `https://www.boredapi.com/api/activity?type=${document.querySelector('select').value}${document.querySelector('#price').value}${document.querySelector('#acc').value}&participants=${document.querySelector('#part').value}`;
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          alert('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        displayActivity(data)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    function displayActivity(data) {
      result.style.display = 'block';
      resultActivity.innerText = data.activity || 'Nothing found';

      if (!data.activity) {
        return resultInfo.style.display = 'none';
      } else {
        resultInfo.style.display = 'block';
      }
      offlineActivities.unshift(data)
      localStorage.offlineActivities = JSON.stringify(offlineActivities);

      type.innerText = 'Type: ' + data.type;
      priceRange.value = data.price * 10;
      accRange.value = data.accessibility * 10;
      partRange.value = data.participants;
      priceRangeValue.innerText = getPriceLabel(data.price);
      accRangeValue.innerText = getAccessibilityLabel(data.accessibility);
      partRangeValue.innerText = data.participants;

      window.scrollTo({
        top: result.offsetTop,
        behavior: 'smooth',
      });

    }

    function getPriceLabel(price) {
      if (price === 0) return 'Free';
      if (price >= 0.5) return 'Expensive';
      if (price >= 0.3) return 'Affordable';
      if (price >= 0) return 'Cheap';
    }

    function getAccessibilityLabel(accessibility) {
      if (accessibility === 0) return 'Accessible';
      if (accessibility >= 0.8) return 'Hardly accessible';
      if (accessibility >= 0.6) return 'Moderately accessible';
      if (accessibility === 0.3) return 'Fairly accessible';
      if (accessibility >= 0) return 'Easily accessible';
    }
  }
});

function nav(move, elems) {
  const currentIndex = document.activeElement;
  const items = document.querySelectorAll(elems);
  let currentElemIdx = [...items].indexOf(currentIndex);
  const next = currentElemIdx + move;
  const targetElement = items[next];
  if (targetElement) targetElement.focus();
}

window.onerror = function (message, source, lineno, colno, error) {
  console.error('Error Message: ' + message);
  console.error('Source: ' + source);
  console.error('Line Number: ' + lineno);
  console.error('Column Number: ' + colno);

  if (error) {
    console.error('Error Object:', error);
  }

  return true;
};

const allSelectElems = document.querySelectorAll('select');

for (let i = 0; i < allSelectElems.length; i++) {
  allSelectElems[i].addEventListener('blur', () => {
    allSelectElems[i].parentElement.focus();
  });
};
