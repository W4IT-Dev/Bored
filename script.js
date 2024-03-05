
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

const typeSel = document.querySelector('#typeSel');
const priceSel = document.querySelector('#priceSel');
const accSel = document.querySelector('#accSel');
const partSel = document.querySelector('#partSel');
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

const adContainer = document.querySelector('#ad-container')

getKaiAd({
  publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
  app: 'bored',
  slot: 'bannerAd',
  h: 60,
  w: 230,
  container: adContainer,
  onerror: err => console.error('Custom catch:', err),
  onready: ad => {
    ad.call('display', {
      tabindex: 5,
      navClass: 'item',
      display: 'flex',
    })
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key == "#") return window.open('/about.html')
  if (e.key === 'Enter' && !document.activeElement.id.includes('gen') && !document.activeElement.id.includes('randomgen')) return document.activeElement.lastElementChild.focus();
  if (e.key === 'ArrowDown') nav(1, '.item');
  if (e.key === 'ArrowUp') nav(-1, '.item');
  if (e.key === 'Enter') {
    const apiURL = `https://www.boredapi.com/api/activity?type=${typeSel.value}${priceSel.value}${accSel.value}&participants=${partSel.value}`;

    // RANDOM GEN
    if (document.activeElement.id === "randomgen") {
      if (!navigator.onLine) return displayActivity(offlineActivities[Math.floor(Math.random() * offlineActivities.length)]);
      fetch("https://www.boredapi.com/api/activity")
        .then((response) => {
          if (!response.ok) {
            alert('Network response was not ok');
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          displayActivity(data)
        })
        .catch((error) => {
          alert('There was a problem with the fetch operation: ' + error);
        });

      return
    }

    // OFFLINE
    if (!navigator.onLine) {
      let filteredElements = offlineActivities;
      //Type
      if (typeSel.selectedIndex !== 0) filteredElements = filteredElements.filter(element => element.type === typeSel.value);
      //Price
      if (priceSel.selectedIndex !== 0) {
        if (priceSel.value == "&price=0") {
          filteredElements = filteredElements.filter(element => element.price === 0);
        } else {
          const minpriceMatch = priceSel.value.match(/(?:&minprice=)([^&]+)/);
          const maxpriceMatch = priceSel.value.match(/(?:&maxprice=)([^&]+)/);

          const minprice = minpriceMatch ? parseFloat(minpriceMatch[1]) : 0;
          const maxprice = maxpriceMatch ? parseFloat(maxpriceMatch[1]) : 0;

          filteredElements = filteredElements.filter(element => element.price >= minprice && element.price <= maxprice);
        }
      }
      //Accesiblities
      if (accSel.selectedIndex !== 0) {
        if (accSel.value == "&accessibility=0") {
          filteredElements = filteredElements.filter(element => element.accessibility === 0);
        } else {
          const minaccMatch = accSel.value.match(/(?:&minaccessibility=)([^&]+)/);
          const maxaccMatch = accSel.value.match(/(?:&maxaccessibility=)([^&]+)/);

          const minacc = minaccMatch ? parseFloat(minaccMatch[1]) : 0;
          const maxacc = maxaccMatch ? parseFloat(maxaccMatch[1]) : 0;

          filteredElements = filteredElements.filter(element => element.accessibility >= minacc && element.accessibility <= maxacc);
        }
      }
      // participants
      if (partSel.selectedIndex !== 0) filteredElements = filteredElements.filter(element => element.participants === Math.floor(partSel.value));

      displayActivity(filteredElements[Math.floor(Math.random() * filteredElements.length)]);
      return
    }
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          alert('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        displayActivity(data)
      })
      .catch((error) => {
        alert('There was a problem with the fetch operation:', error);
      });


    // DISPLAY ACTIVITY
    function displayActivity(json) {
      result.style.display = 'block';
      if (json === undefined || json === null) {
        resultActivity.innerText = 'Nothing found'
        resultInfo.style.display = 'none';
        scroll();
        return
      }
      resultActivity.innerText = json.activity || 'Nothing found';
      json.activity ? resultInfo.style.display = 'block' : resultInfo.style.display = 'none';

      if (navigator.onLine && offlineActivities.find(obj => obj.key === json.key) == undefined) {
        offlineActivities.unshift(json)
        localStorage.offlineActivities = JSON.stringify(offlineActivities);
      }

      type.innerText = 'Type: ' + json.type;
      priceRange.value = json.price * 10;
      accRange.value = json.accessibility * 10;
      partRange.value = json.participants;
      priceRangeValue.innerText = getPriceLabel(json.price);
      accRangeValue.innerText = getAccessibilityLabel(json.accessibility);
      partRangeValue.innerText = json.participants;

      scroll();
    }

    function scroll() {
      window.scrollTo({
        top: resultActivity.offsetTop,
        behavior: 'smooth',
      });
    }


    // GET LABELS 
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
  else return console.log('No nav element.');
  if (targetElement && targetElement.classList.contains('canFocusWithin') && !targetElement.classList.contains('ad-container')) targetElement.parentNode.classList.add('focus-within')
  if (currentIndex.classList.contains('canFocusWithin')) currentIndex.parentNode.classList.remove('focus-within');
}

window.onerror = function (message, source, lineno, colno, error) {
  console.error('Error Message: ' + message);
  console.error('Source: ' + source);
  console.error('Line Number: ' + lineno);
  console.error('Column Number: ' + colno);
  if (error) console.error('Error Object:', error);
  return true;
};

const allSelectElems = document.querySelectorAll('select');

for (let i = 0; i < allSelectElems.length; i++) {
  allSelectElems[i].addEventListener('blur', () => {
    allSelectElems[i].parentElement.focus();
  });
};
