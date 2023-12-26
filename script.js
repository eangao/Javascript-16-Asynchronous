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

// const getCountryData = function (country) {
//   // this is the old school way of doing AJAX in JavaScript.
//   // But I'm still showing it to you for two reasons.

//   // So first, I want you to know that XML HTTP requests exists,
//   // because you might actually need it in the future.

//   // And second, I want to show you how AJAX calls
//   // used to be handled with events
//   // and callback functions.
//   // And so only after that
//   // we should move on to a more modern way
//   // of handling asynchronous JavaScript,
//   // which is gonna be a feature called Promises.
//   const request = new XMLHttpRequest();
//   // request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   //use this api if the above is updated or change
//   // like from previous training it uses v.2 and now v.3.1
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );

//   // what we need to do
//   // is to register a callback
//   // on the request object for the load event.
//   // So request, and then again,
//   // our old friend, addEventListener.
//   // And here on the request,
//   // we will wait for the load event.
//   // So again, here, we basically send off the request.
//   // And so that request
//   // then fetches the data in the background.
//   // And then once that is done,
//   // And so using this event listener,
//   // we are waiting for that event.
//   // And so as soon as the data arrives,
//   // this callback function here will be called.
//   request.send();

//   request.addEventListener('load', function () {
//     //   So we could also do request,
//     // but let's just use the this keyword.
//     // And then the response is in the property response text.
//     // And again, this property here is of course,
//     // only gonna be set
//     // once the data has actually arrived,
//     // console.log(this.responseText);

//     //   Now, you'll see that this is actually
//     // an array containing one object.
//     // And so let's quickly de-structure that like this.
//     // const [data] = JSON.parse(this.responseText);

//     // So remember, that would be the same thing as doing this.
//     // const data = JSON.parse(this.responseText)[0];

//     // Right, but of course, de-structuring
//     // is a lot more beautiful.
//     // And so now we get immediately the object here.
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('philippines');

////////////////////////////////////////////////////////////////////
// [OPTIONAL] How the Web Works: Requests and Responses
////////////////////////////////////////////////////////////////////
// SEE PDF LECTURE AND VIDEO

//////////////////////////////////////////////////////////////////
// Welcome to Callback Hell
//////////////////////////////////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
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
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   // request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   //use this api if the above is updated or change
//   // like from previous training it uses v.2 and now v.3.1
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// // So in other words, here, we have nested callbacks.
// // But now imagine that we wanted
// // to do more requests in sequence,
// // like the neighbor of the neighbor of the neighbor,
// // and like 10 times over.

// // So in that case, we would end up
// // with callbacks inside of callbacks inside of callbacks,
// // like 10 times.
// // And actually, for that kind of structure.
// // And for that kind of behavior, we have a special name.
// // And that special name is callback hell.

// // So basically, callback hell
// // is when we have a lot of nested callbacks
// // in order to execute asynchronous tasks in sequence.
// // And in fact, this happens for all asynchronous tasks,
// // which are handled by callbacks.
// // And not just AJAX calls.

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// // we have callback hell.
// // And in fact, callback hell is pretty easy to identify
// // by this triangular shape that is formed here, you see that.
// // And also the same is starting to appear here.
// // So if we had more callbacks in here,
// // then we would start to see a lot more indentation here.
// // And then this triangular shape, would also appear there.
// // Now, the problem with callback hell
// // is that it makes our code look very messy.
// // But even more important,
// // it makes our code harder to maintain,
// // and very difficult to understand, and to reason about,
// // and code that is hard to understand
// // and difficult to reason about.
// // Will have more bugs, and it's just worse code.
// // So this is a great rule

// // that you should always remember and keep in mind.
// // So again, the rule is that code that's hard to understand,
// // is basically bad code, because it will have more bugs,
// // because the harder it is to understand code
// // and to reason about the code,
// // the more difficult it will be to add new features
// // and to add more functionality to the application.

// // But anyway, given all these problems with callback hell,
// // we of course, need a way to solve callback hell.
// // And fortunately for us, since ES6,
// // there is actually a way of escaping callback hell
// // by using something called promises.
// // And so let's now take the next step
// // in our journey of asynchronous JavaScript,
// // which is to learn all about promises.

//////////////////////////////////////////////////////////////////
// Promises and the Fetch API
//////////////////////////////////////////////////////////////////

// //SEE PDF LECTURE AND VIDEO

// // const request = new XMLHttpRequest();
// // request.open(
// //   'GET',
// //   `https://countries-api-836d.onrender.com/countries/name/${country}`
// // );
// // request.send();

// // Now there are actually some more options
// // that we can specify here
// // in the fetch function, if we'd like,
// // but to make a simple get request like this one,
// // all we really need is to pass in the URL
// // and that's it.
// // So for more complex AJAX calls,
// // the fetch function can take in like an object
// // of options as well
// // But again, for now, we don't need that.
// const request = fetch(
//   'https://countries-api-836d.onrender.com/countries/name/portugal'
// );
// console.log(request);

////////////////////////////////////////////////////////////////////
// Consuming Promises
////////////////////////////////////////////////////////////////////
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);

//       //     So again, the json method here
//       // is a method that is available
//       // on all the response objects that is coming
//       // from the fetch function,
//       // so all of the resolved values,
//       //     And so therefore it does have
//       // the json method attached to it.

//       // Now, the problem here is
//       // that this json function itself,
//       // is actually also an asynchronous function.
//       // And so what that means,
//       // is that it will also return a new promise.
//       // And that's all a bit confusing
//       // and I really don't know why it was implemented like this,
//       // but this is just how it works.
//       // So anyway, what we need to do now here
//       // is to actually return this promise from here.
//       // Okay, because remember this here will be a new promise.

//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// // So let's recap what happened here.
// // And the first part here I think, is pretty straight forward
// // which is this fetch function here returning a promise.
// // And then we handled that promise
// // using the then method, right.
// // But then to actually read the data from the response,
// // we need to call the json method on that response object.
// // Now this itself will also return a promise.
// // And so if we then return that promise from this method
// // then basically all of this becomes a new promise itself.
// // And so since this is a promise
// // we can then again, call the then method on that.
// // And so then again we have a callback
// // and this time, we get access to the data
// // because the resolved value of this promise here
// // is going to be the data itself.
// // So basically the data that we're looking for,
// // which is then this one here, right.

// ====///////
// we can create a highly simplified version as well.
const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('usa');

// So promises do not get rid of callbacks,
// but they do in fact get rid of callback hell.
