'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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
// // const getCountryData = function (country) {
// //   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
// //     .then(function (response) {
// //       console.log(response);

// //       //     So again, the json method here
// //       // is a method that is available
// //       // on all the response objects that is coming
// //       // from the fetch function,
// //       // so all of the resolved values,
// //       //     And so therefore it does have
// //       // the json method attached to it.

// //       // Now, the problem here is
// //       // that this json function itself,
// //       // is actually also an asynchronous function.
// //       // And so what that means,
// //       // is that it will also return a new promise.
// //       // And that's all a bit confusing
// //       // and I really don't know why it was implemented like this,
// //       // but this is just how it works.
// //       // So anyway, what we need to do now here
// //       // is to actually return this promise from here.
// //       // Okay, because remember this here will be a new promise.

// //       return response.json();
// //     })
// //     .then(function (data) {
// //       console.log(data);
// //       renderCountry(data[0]);
// //     });
// // };

// // // So let's recap what happened here.
// // // And the first part here I think, is pretty straight forward
// // // which is this fetch function here returning a promise.
// // // And then we handled that promise
// // // using the then method, right.
// // // But then to actually read the data from the response,
// // // we need to call the json method on that response object.
// // // Now this itself will also return a promise.
// // // And so if we then return that promise from this method
// // // then basically all of this becomes a new promise itself.
// // // And so since this is a promise
// // // we can then again, call the then method on that.
// // // And so then again we have a callback
// // // and this time, we get access to the data
// // // because the resolved value of this promise here
// // // is going to be the data itself.
// // // So basically the data that we're looking for,
// // // which is then this one here, right.

// // ====///////
// // we can create a highly simplified version as well.
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('usa');

// // So promises do not get rid of callbacks,
// // but they do in fact get rid of callback hell.

//////////////////////////////////////////////////////////////////
// Chaining Promises
// //////////////////////////////////////////////////////////////////
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       //       And so again,
//       // the second Ajax call depends on the data
//       // from the first call.
//       // And so they need to be done in sequence.
//       // to happen here in
//       // this then handler.
//       // So as soon as we get the data,
//       // then we need to get the neighbor country
//       // and do the Ajax call for that one as well.
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );

//       // so by returning this promise here,
//       // then the fulfilled value
//       // of the next then method will be fulfilled value of
//       // this previous promise.
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };

// // getCountryData('usa');
// getCountryData('germany');

// // So right now we have four steps here, even,
// // but of course we could extend this as much
// // as we want.
// // So even if we wanted the neighbor of the neighbor
// // of the neighbor,
// // like 10 countries,
// // we could easily do this by chaining all these promises
// // one after another and all
// // without the callback hell.

// // So here, instead of the callback,
// // hell we have what we call a flat chain of promises.
// // And this one is again,
// // very easy to understand and to read.

// // So as a conclusion to this video and the previous one,
// // promises really,
// // are an incredibly powerful and elegant solution
// // to handle asynchronous code.

// //======
// // Now, just to finish,
// // I want to show you a pretty common mistake
// // that many beginners make,
// // which is to basically chain this then method directly
// // onto a new nested promise.
// // So as we know,
// // this one immediately returns a promise.
// // And so many beginners basically do this instead,
// // let me show it to you here.
// // So instead of returning the new promise,
// // they then chain theme then method right here.
// // So right inside of
// // this then method.
// // Now this actually does still work,
// // but then we are in fact back to callback hell.

// // Because now indeed,
// // we have one callback function here
// // defined inside of another one.
// // So inside of this,
// // in closing callback function.
// // Okay.
// // And so of course
// // that's exactly what we're trying to avoid.
// // And so don't do this.

// // const getCountryDataSample = function (country) {
// //   // Country 1
// //   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
// //     .then(response => response.json())
// //     .then(data => {
// //       renderCountry(data[0]);

// //       const neighbour = data[0].borders[0];
// //       if (!neighbour) return;

// //       // Country 2
// //       fetch(
// //         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
// //       ).then(response => response.json())
// //     })
// //     .then(response => response.json())
// //     .then(data => renderCountry(data, 'neighbour'));
// // };

// ///===

// // So always return to promise
// // and then handle it outside by simply continuing
// // the chain like this.

// // Alright, but I hope that this
// // was already pretty obvious anyway,
// // from all the explanations that I gave you throughout
// // this lecture and the previous one.

// // But anyway,
// // let's now move on and actually handle errors because
// // that is also a pretty common scenario when we work
// // with promises and especially
// // with Ajax calls.

///////////////////////////////////////////////////////////////////////
// Handling Rejected Promises
///////////////////////////////////////////////////////////////////////

// an important part of web development
// is to actually handle the errors
// because it's very common that errors happen
// in web applications.

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       console.log(response);

//       //       the error message, then we use the throw keyword here,
//       // which will immediately terminate the current function.
//       // So just like return does it.
//       // Now the effect of creating,
//       // and throwing an error in any of these then methods
//       // is that the promise will immediately reject.
//       // So basically, the promise returned
//       // by this then handler here will be a rejected promise.
//       // And that rejection will then propagate all the way down
//       // to the catch handler
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = ' sdfsfsf';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))

//     //     All right, so again this catch method here
//     // at the end of the chain will basically catch any errors
//     // that occur in any place in this whole promise chain
//     // and no matter where that is.
//     // So errors basically propagate down the chain
//     // until they are caught,
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })

//     //     So besides then and catch there is also the finally method.
//     // So let's add a finally here, finally.
//     // And then the callback function that we defined here
//     // will always be called whatever happens with the promise.
//     // So no matter if the promise is fulfilled or rejected
//     // this callback function that we define here
//     // is gonna be called always.
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

///////////////////////////////////////////////////////////
// Throwing Errors Manually
///////////////////////////////////////////////////////////
// this getJSON function will actually return a promise.
// And so this is then just like any other promise
// const getJson = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1

//   getJson(
//     `https://countries-api-836d.onrender.com/countries/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       console.log(neighbour);

//       if (!neighbour) throw new Error('No neighbour found');

//       // Country 2
//       return getJson(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))

//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })

//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

// getCountryData('australia');

// All right, so let's now quickly recap here.
// And I think that the big takeaway from this lecture
// is that whenever we want to create some error
// that we want to handle down here,
// in the catch handler, all we need to do is to throw,
// and create a new error, just like we did here.
// And of course, we can do that for multiple reasons.
// So in this case, here, we did it simply
// because in the situation, no neighbor can be found.
// And so that is a good reason to display an error message
// on the user interface,
// and since we do that down here in our error handler,
// the best way of doing that is to indeed throw an error.
// And remember that this works,
// because throwing an error inside of this callback function
// of this then method will immediately reject this promise.
// And so then that rejected promise will travel down
// the chain until it is eventually caught somewhere.
// So again, in this case, it is right here
// in this catch handler.
// So when working with real applications
// in the real world, really make sure
// to keep this technique in mind,
// because it's really important.

//////////////////////////////////////////////////////////////////////////
// Coding Challenge #1
//////////////////////////////////////////////////////////////////////////

// // In this challenge you will build a function 'whereAmI' which renders a country
// // only based on GPS coordinates. For that, you will use a second API to geocode
// // coordinates. So in this challenge, you’ll use an API on your own for the first time �

// // Your tasks:

// // PART 1

// // 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// // and a longitude value ('lng') (these are GPS coordinates, examples are in test
// // data below).

// // 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// // to convert coordinates to a meaningful location, like a city and country name.
// // Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// // will be done to a URL with this format:
// // https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// // promises to get the data. Do not use the 'getJSON' function we created, that
// // is cheating �

// // 3. Once you have the data, take a look at it in the console to see all the attributes
// // that you received about the provided location. Then, using this data, log a
// // message like this to the console: “You are in Berlin, Germany”

// // 4. Chain a .catch method to the end of the promise chain and log errors to the
// // console

// // 5. This API allows you to make only 3 requests per second. If you reload fast, you
// // will get this error with code 403. This is an error with the request. Remember,
// // fetch() does not reject the promise in this case. So create an error to reject
// // the promise yourself, with a meaningful error message

// // PART 2

// // 6. Now it's time to use the received data to render a country. So take the relevant
// // attribute from the geocoding API result, and plug it into the countries API that
// // we have been using.

// // 7. Render the country and catch any errors, just like we have done in the last
// // lecture (you can even copy this code, no need to type the same code)

// // Test data:

// // § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// // § Coordinates 2: 19.037, 72.873
// // § Coordinates 3: -33.933, 18.474

// // GOOD LUCK �

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })

//     .catch(err => console.error(`${err.message}`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/////////////////////////////////////////////////////////////////////
// Asynchronous Behind the Scenes: The Event Loop
/////////////////////////////////////////////////////////////////////
// SEE PDF LECTURE AND VIDEO

///////////////////////////////////////////////////////////////////
// The Event Loop in Practice
///////////////////////////////////////////////////////////////////

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// // So the first two messages that are gonna be printed
// // should be pretty obvious,
// // that's because we already know that any top level of coat.
// // So coat outside of any callback, will run first.
// // And so of course, the first two logs will come
// // from these two synchronous, console dot log Sierra.
// // But now between the timer, and the resolved promise here,
// // it might be a little bit trickier.
// // So both the timer and a promise,
// // will finish at the exact same time.
// // So both right after zero seconds.
// // So the timer,because we told it to finish after zero seconds

// // and a promise because we told it to immediately
// // become resolved.

// // And so therefore,
// // they will both finish at the exact same time.
// // So which one do you think will be handled first
// // or in other words,
// // which of these two callbacks here will be executed first?
// // Well, the timer appears first in the coat
// // and so it kind of finished first.
// // And so it's callback,
// // will be put on the callback queue first, but does that mean
// // that this call back here will be executed first?
// // Well, actually, no, it doesn't.
// // And that's because of the micro-tasks queue, remember?
// // So the callback of the resolved promise here,
// // so this one will be put on the micro-tasks queue and this
// // micro-tasks queue, as you learned in the last video
// // has priority over the callback queue.

// // And so after this whole code runs,
// // we will have one callback in a callback queue
// // and one in a micro-tasks queue.
// // And therefore the one from the micro tests queue
// // should be executed first.
// // And so therefore the callback from the micro-tasks queue
// // should be executed first.
// // And so that's this one here and there for the first message
// // to appear of these two, should be resolved Promise one.
// // All right.

// // So the order in which they should appear
// // is this tenders, tenders and finally the timer.
// // And so that's now finally confirmed as, so I'm saving it
// // and indeed did as exactly as expected.
// // And so that's a relief actually.
// // So what I told you in the last lecture is actually true.
// // Now we proved it with coat.

// // Now, remember that the implication
// // of the fact that micro-tasks have priority
// // over regular callbacks, is that if one of
// // the micro-tasks takes a long time to run,
// // then the timer will actually be delayed and not run after
// // the zero seconds that we specified here, right?
// // So instead it will run a little bit later just after
// // the micro-task is actually done with its work.
// // And so to finish this lecture,

// // let's actually simulate what I just said.
// // So here I will create another promise,
// // that will immediately resolve.
// // So let's just say resolved promise two, and then again,
// // we can handle it here.
// // And then as always, we want to log,
// // the result to the console.
// // But before we doing that,
// // we actually want this callback function
// // to have a really heavy task,
// // which should take a lot of time.
// // And so let's simulate that this callback takes a long time
// // to run, by looping over a large number.
// // So we can do the simulation simply,
// // with an old school four loop.
// // So let's start with I at zero and now I will loop
// // all the way until one like very large number.
// // Let's say this, and I will have to experiment a little bit.
// // And for your computer, it might indeed be different.
// // So if your computer is slower,
// // maybe then you want a smaller number
// // and maybe it's faster than mine.
// // And then maybe a smaller number will be enough, right?
// // I'm not sure if I said it correctly.
// // So if your computer is slower than mine,
// // then you will need a larger number, right?
// // And so again, this line of code here will simulate
// // that the callback function takes a long time.
// // So really just this micro-task takes a long time.
// // All right, it is not the asynchronous task itself.
// // So the promise itself will still be resolved immediately,
// // but then the micro-task that it contains,
// // so that it puts on the micro-tasks queue.
// // That's the one that will take a long time.
// // And so by doing that,
// // I can show you that the callbacks in the callback queue,
// // just like this one here, will indeed be delayed
// // and not run after zero seconds.
// // So let's try this now,
// // and you see it took a long time here
// // until this lock appeared, right?

// // So maybe we can have even a bigger number.
// // And I hope that my computer is not going to explode,
// // with this one.
// // So you see that the page is kind of loading here
// // and it's taking a lot of time.
// // And so, actually now eventually it finished,
// // but you see, that now only after all this work,
// // the zero second timer message appeared on the screen.
// // And so this is actual proof that these zero seconds
// // that we have here are not a guarantee.
// // Okay.

// // And that is exactly what I wanted to show you.
// // So this means, that you cannot really do high precision
// // things using JavaScript timers.
// // So just keep that in mind,
// // whenever you are working with promises.
// // So basically with micro-tasks,
// // and with timers at the same time.
// // Okay.

// // Let's just remove the zero here,
// // so that you don't explode your computer,
// // but you still see that the effect is the same.
// // All right, and that's actually enough for this video.
// // I think I proved my point and demonstrated to the things
// // that we just learned in the previous lecture.

/////////////////////////////////////////////////////////////
// Building a Simple Promise
/////////////////////////////////////////////////////////////

// // and we create a new promise using the promise constructor.
// // So that's new promise like this.
// // So just like many other built-in objects.
// // And so what this means is that promises
// // are essentially just a special kind of object in JavaScript.
// // Now the promise constructor takes exactly one argument
// // and that is the so-called executor function.
// // So we need to pass in a function here.

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');

//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// // Now, in practice, most of the time all we actually do
// // is to consume promises.
// // And we usually only built promises
// // to basically wrap old
// // callback based functions into promises.
// // And this is a process that we call promisifying.
// // So basically promisifying
// // means to convert callback based asynchronous behavior
// // to promise based.

// //====Promisifying setTimeout

// // And so now inside of this function
// // we will actually create and return the promise.
// // So usually that's always what we do.
// // So creating a function
// // and then from there returning a promise.
// // And so this will then encapsulate
// // the asynchronous operation even further.
// // So essentially that's also what the fetch function does.
// // It's a function that returns a promise,
// // and so that is exactly what we will do
// // here with this wait function.

// const wait = function (seconds) {
//   //   we actually don't even need the reject function.
//   // And that's because it's actually impossible
//   // for the timer to fail.
//   // And so therefore
//   // we will never mark this promise as rejected.
//   // And so here we don't even need
//   // to specify debt reject parameter.
//   // It's just like the array methods like map
//   // which always receive three arguments
//   // but most of the time we just use one or two of them.
//   // And so this is similar,

//   return new Promise(function (resolve) {
//     //     And in this case, we're actually not even going to pass
//     // any resolved value into the resolve function
//     // because that's actually not mandatory.
//     // And so in the case of this timer,
//     // it's also not really necessary.
//     // And so in the case of a timer,
//     // it's also not really necessary to wait for some value.
//     // So in this case, all we want to do
//     // is to basically make our code wait.
//     // And so no resolved values are needed.
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // // And then here in our callback function,
// // // remember we are not going to receive any resolved value.
// // // So we just leave this empty
// // wait(2)
// //   .then(() => {
// //     console.log('I waited for 2 seconds');

// //     // And so just like before
// //     // we now have to return a new promise here,
// //     // so return, wait, and this time just one second.
// //     // And so this is exactly what we did before
// //     // when we wanted to chain two sequential Ajax calls
// //     // using the fetch function.
// //     // So in the result of the first fetch,
// //     // we would create a new fetch and return it.
// //     return wait(1);
// //   })
// //   .then(() => console.log('I waited for 1 second'));

// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 second passed');
// //     setTimeout(() => {
// //       console.log('3 second passed');
// //       setTimeout(() => {
// //         console.log('4 second passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// // What matters is that now
// // we no longer have this ugly
// // and difficult to understand callback hill,
// // but instead we have this nice sequence
// // of asynchronous behavior.
// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 seconds passed');
//   });

// //   Now finally dare also actually a way
// // to very easy create a fulfilled
// // or a rejected promise immediately.

// // And so basically this is a static method
// // on the promise constructor.
// // will resolve immediately
// // like -> resolve('You WIN 💰');
// Promise.resolve('abc').then(x => console.log(x));

// //  and here to then is not necessary
// // because there will be no resolved value anyway.
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// // So this is how we built our own promises
// // and how we promisify
// // a very simple callback based asynchronous behavior function
// // such as set timeout.

//////////////////////////////////////////////////////////////////
// Promisifying the Geolocation
//////////////////////////////////////////////////////////////////

// // we're gonna promisify the geolocation API,
// // and this is gonna be really cool
// // because it will allow us to take the small app
// // that we built in the last coding challenge
// // to the next level.
// // Now we used the geolocation API before,
// // and so let's start by reviewing how it works.
// // So remember we use navigator
// // .geolocation.getcurrentposition,
// // and then this function here accepts two callbacks
// // where the first is for the success
// // and the second one is for the error.

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// // this is actually asynchronous behavior
// // in exactly the way that we have been talking about.

// console.log('Getting position');

// // and so this is another great opportunity
// // to promisify a callback based API, to a promise based API.
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position), //success
//     //   err => reject(err)
//     // );
//     //================
//     //     So this is exactly the same as this one here.
//     // So before we specified the callback manually like this,
//     // but all we did was to take the position
//     // and pass it down into resolve,
//     // but here that now happens automatically.
//     // So now resolve itself is the callback function,
//     // which will get called with the position,
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));

// ///=====
// // but now let's actually take it to the next level.
// // So remember how in the last coding challenge,
// // we built a function which received GPS coordinates
// // as an input, and then rendered the corresponding country.
// // Well, now we actually got these coordinates via geolocation
// // and so we don't even have to pass in any coordinates
// // into that function.

// // but now since we have this get positioned function,
// // we actually no longer need to even pass in
// // these coordinates
// // and so now we're gonna be able to build a function
// // that will tell us where we are in the world,
// // simply based on the geolocation of our device.
// // const whereAmI = function (lat, lng) {

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       // console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message}`));
// };

// btn.addEventListener('click', whereAmI);

// // Now, just imagine that you would have to handle
// // all of these asynchronous operations here
// // using callback function.
// // So that would literally be hell.
// // So therefore the name callback hell,

// // but again, with this,
// // we have a really nice flat chain of promises
// // that's easy to handle and also easy to manage.
// // Now.

// // But anyway, with this, we saw that We can really promisify
// // all kinds of asynchronous stuff in JavaScript.
// // For example, we could also promisify,
// // the old XML HTTP request function
// // that we used in the beginning to make Ajax calls,

////////////////////////////////////////////////////////////////////
// Coding Challenge #2
////////////////////////////////////////////////////////////////////

// // For this challenge you will actually have to watch the video! Then, build the image
// // loading functionality that I just showed you on the screen.

// // Your tasks:

// // Tasks are not super-descriptive this time, so that you can figure out some stuff by
// // yourself. Pretend you're working on your own �

// // PART 1

// // 1. Create a function 'createImage' which receives 'imgPath' as an input.
// // This function returns a promise which creates a new image (use
// // document.createElement('img')) and sets the .src attribute to the
// // provided image path

// // 2. When the image is done loading, append it to the DOM element with the
// // 'images' class, and resolve the promise. The fulfilled value should be the
// // image element itself. In case there is an error loading the image (listen for
// // the'error' event), reject the promise

// // 3. If this part is too tricky for you, just watch the first part of the solution

// // PART 2

// // 4. Consume the promise using .then and also add an error handler

// // 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// // function we created earlier

// // 6. After the 2 seconds have passed, hide the current image (set display CSS
// // property to 'none'), and load a second image (Hint: Use the image element
// // returned by the 'createImage' promise to hide the current image. You will
// // need a global variable for that �)

// // 7. After the second image has loaded, pause execution for 2 seconds again

// // 8. After the 2 seconds have passed, hide the current image

// // Test data: Images in the img folder. Test the error handler by passing a wrong
// // image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// // otherwise images load too fast

// // GOOD LUCK �

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';

//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';

//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .catch(err => console.error(err));

/////////////////////////////////////////////////////////////////
// Consuming Promises with Async/Await
/////////////////////////////////////////////////////////////////

// // // And we do this by simply adding
// // // async here in front of the function.
// // // And so this function is now an asynchronous function.
// // // So a function that will basically keep running in the
// // // background while performing the code that inside of it,
// // // then when this function is done,
// // // it automatically returns a promise,
// // const whereAmI = async function (country) {
// //   //   we can use the await keyword to basically await for the
// //   // result of this premise.
// //   // So basically await will stop decode execution at this
// //   // point of the function until the premise is fulfilled.
// //   // And so until the data has been fetched in this case,

// //   // but now after that explanation,
// //   // you might think isn't stopping the code,
// //   // blocking the execution?
// //   // Well, that's a really good question,
// //   // but the answer is actually no, in this case,
// //   // because stopping execution in an a sync function,
// //   // which is what we have here is actually not a problem because
// //   // this function is running asynchronously in the background.
// //   // And so therefore it is not blocking the main threat of
// //   // execution.
// //   // So it's not blocking the call stack. And in fact, that's,
// //   // what's so special about a single wait.
// //   // So it's the fact that it makes our code look like regular
// //   // synchronous code while behind the scenes.
// //   // Everything is in fact asynchronous.

// //   // So you see here that by using a sync await
// //   // or asynchronous
// //   // code here, Oh,
// //   // really looks and feels like synchronous code.
// //   // So we can simply await until the value of the premise is
// //   // returned basically.
// //   // And then just assign that value to a variable meant that is
// //   // something that was impossible before.
// //   // So before we had to mess with callback functions and dead
// //   // was true in callback hell,
// //   // but also by consuming premises with the then method.
// //   // But now with a sync await, that is just completely gone,

// //   // this looks now like normal synchronous code where we simply
// //   // assign values to a variable,
// //   // and that makes it so much easier and more clean.
// //   // In my opinion.
// //   const res = await fetch(
// //     `https://countries-api-836d.onrender.com/countries/name/${country}`
// //   );
// //   console.log(res);

// //   // Now, before you start using a sync await all
// //   // over the place,
// //   // you need to first understand that a sink await is in fact,
// //   // simply syntactic sugar over the then method in premises.
// //   // So of course behind the scenes, we are still using premises.
// //   // We are simply using a different way of consuming them here
// //   // in this case, but what we have here.
// //   // So this is essentially exactly the same
// //   // as doing
// //   // it the old way,
// //   // basically.
// //   // So using then and then res
// //   // and then console dot log res
// //   // like we did here.
// //   // So this is exactly the same.
// //   // OLD ONE
// //   // fetch(
// //   //   `https://countries-api-836d.onrender.com/countries/name/${country}`
// //   // ).then(res => console.log(res));
// // };

// // whereAmI('portugal');
// // console.log('FIRST');

// ///=====

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // So now that we know how a sync await works,
// // it's time to actually recreate the, where am I a function?
// // So first off we need to get the Jason out
// // of this response,
// // we need to call Jason
// // and remember that this itself returns
// // a new premise.
// // And so previously we would have to return this premise
// // and then chain another then handler.
// const whereAmI2 = async function () {
//   // Geolocation
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   //=====Reverse geocoding====
//   //   And so now again,
//   // it becomes a lot easier to basically chain premises
//   // because we don't have to return anything.
//   // We don't have to create new then methods and
//   // we don't have to create new callback functions.
//   // So all we have to do is to await this and
//   // store the results into some variable.
//   const resGeo = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   );

//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);
//   console.log(dataGeo.countryName);

//   // Country data
//   const res = await fetch(
//     `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
//   );

//   //   But now this becomes so much easier.
//   // All we have to do is to, again,
//   // await this and then we can store
//   // the results directly into the data
//   // variable that we have been using before.

//   //   And all without de-chaining of promises like we had before.
//   // So this is really elegant. One more time,
//   // simply being able to essentially store the fulfilled promise
//   // value immediately into a variable without having to mess
//   // with callback functions now. Okay.
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };

// whereAmI2();

// // And so we now have all of this in one nice a sync function
// // that runs behind the scenes until everything here is
// // finished.
// // So we are awaiting here one, two, three, four,
// // five promises
// // in a very easy way.
// // And code that now actually looks and feels like normal
// // synchronous code.
// // So to me personally,
// // this a sync await feature was really a huge,
// // huge addition to the JavaScript language.
// // Now, again,
// // just keep in mind that a sync await is just synthetic sugar
// // over consuming promises.
// // So it's a bit like classes in JavaScript,
// // which also hides the true nature of how things work behind
// // the scenes.
// // But I think that's no problem.
// // At least if you already know exactly how promises
// // and asynchronous JavaScript actually do work
// // behind the scenes.
// // And we spent a lot of time in this section
// // learning all that.
// // And so I'm sure that you will be fine.
// // Also a sync await is actually used a lot together with the
// // more traditional then method of consuming pr0mises

///////////////////////////////////////////////////////////////////
// Error Handling With try...catch
// ///////////////////////////////////////////////////////////////////
// // So try catch has nothing to do with async/await.
// // But we can still use it to catch errors in async functions.

// // But anyway, this year is just a stupid syntax error.
// // And of course, we're not going to use try catch
// // to find mistakes that we make in our code.
// // And so let's know use try catch for something more useful,
// // which is to actually handle real errors in async functions.
// // try {
// //   let y = 1;
// //   const x = 2;
// // //  x = 3;
// //   y = 3;
// // } catch (err) {
// //   alert(err.message);
// // }

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding .
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     );

//     if (!resGeo.ok) throw new Error('Problem getting location data');

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);
//     console.log(dataGeo.countryName);

//     // Country data
//     const res = await fetch(
//       `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
//     );

//     if (!res.ok) throw new Error('Problem getting country');

//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch (err) {
//     console.log(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//   }
// };

// whereAmI();

// // So again, please never ignore handling errors,
// // especially when it comes to asynchronous code
// // like this one, because here,
// // there is always a lot of stuff that can go wrong.
// // And so our application needs to be ready to handle that.

////////////////////////////////////////////////////////////////////
// Returning Values from Async Functions
////////////////////////////////////////////////////////////////////

// At this point,
// we have a pretty good idea
// of how to work with async/await, right?
// However, there is one important thing missing.
// So right now, it might still be a little bit unclear
// what an async function actually is and how it works.

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding .
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
    );

    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');

// told you that an async function always returns a promise.
// The reason for that is that at this point of the code,
// JavaScript has simply no way of knowing yet
// there's a string here that we want
// because the function is still running,
// but it is also not blocking the code out here.
// And so therefore again, at this point,
// JavaScript has no way of knowing
// what will be returned from this function.
// And so therefore all that this function does return
// is a promise.
// Now the value that we return from an async function,
// so again, that's this string here
// will become the fulfilled value of the promise
// that is returned by the function.
// // And so that's important to understandn here,
// the fulfilled value of that promise
// is going to be this string here,
// because that is the value that we return
// from the async function
// while at least if there is no error here happening
// in the function,
// but for now, let's assume the success here again..
// So again, this promise that we see dow

// but of course this one here didn't work,
// const city = whereAmI();
// console.log(city);

// but here it is going to work.
// Because again, in the then handler,
// this argument that will be passed into the callback function
// is going to be the result value of the promise.

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.log(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

//   Now this of course works just fine, but in my opinion,
// there's still a problem here.
// And that problem is the fact that doing this here
// kind of makes this the philosophy of async/await
// with handling promises using then and catch, right?
// So we are mixing the old
// and the new way of working with promises here,
// all in the same code.
// And that's something that I personally don't like.
// So I prefer to always just use async functions
// instead of having to mix them.
// And so let's now go ahead
// and convert this to async/await as well.

// Now it would be great if we could simply use await
// without the async function,
// but that doesn't really work, at least for now,
// because there is actually a proposal in the works
// to make this happen, but for now,
// await can only be used inside an async function.
// However, we don't really want a new complete function here,
// and so instead we can use an IIFE.
// So remember IIFEs from way back,
// they are immediately-invoked function expressions.
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message} 💥`);
  }

  console.log('3: Finished getting location');
})();

// We managed to do the conversion
// and now everything is using async/await.
// And so that's much nicer.
// And now we know how to basically return data
// from an async function
// and how to properly receive and handle that returned data.
// Right?

// And actually in the real life,
// this is something that happens all the time.
// So it's pretty common that we have async functions
// calling other async functions
// and returning values between them.
// And so that's the reason why I'm showing you all this.
// To make sure that you really correctly understand
// how async functions work behind the scenes.
