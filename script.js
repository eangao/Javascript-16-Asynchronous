'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

////////////////////////////////////////////////////////
// Asynchronous JavaScript, AJAX and APIs
////////////////////////////////////////////////////////
// SEE PDF LECTURE AND VIDEO

//////////////////////////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
//////////////////////////////////////////////////////////

const getCountryData = function (country) {
  // this is the old school way of doing AJAX in JavaScript.
  // But I'm still showing it to you for two reasons.

  // So first, I want you to know that XML HTTP requests exists,
  // because you might actually need it in the future.

  // And second, I want to show you how AJAX calls
  // used to be handled with events
  // and callback functions.
  // And so only after that
  // we should move on to a more modern way
  // of handling asynchronous JavaScript,
  // which is gonna be a feature called Promises.
  const request = new XMLHttpRequest();
  // request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  //use this api if the above is updated or change
  // like from previous training it uses v.2 and now v.3.1
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );

  // what we need to do
  // is to register a callback
  // on the request object for the load event.
  // So request, and then again,
  // our old friend, addEventListener.
  // And here on the request,
  // we will wait for the load event.
  // So again, here, we basically send off the request.
  // And so that request
  // then fetches the data in the background.
  // And then once that is done,
  // And so using this event listener,
  // we are waiting for that event.
  // And so as soon as the data arrives,
  // this callback function here will be called.
  request.send();

  request.addEventListener('load', function () {
    //   So we could also do request,
    // but let's just use the this keyword.
    // And then the response is in the property response text.
    // And again, this property here is of course,
    // only gonna be set
    // once the data has actually arrived,
    // console.log(this.responseText);

    //   Now, you'll see that this is actually
    // an array containing one object.
    // And so let's quickly de-structure that like this.
    // const [data] = JSON.parse(this.responseText);

    // So remember, that would be the same thing as doing this.
    // const data = JSON.parse(this.responseText)[0];

    // Right, but of course, de-structuring
    // is a lot more beautiful.
    // And so now we get immediately the object here.
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('philippines');
