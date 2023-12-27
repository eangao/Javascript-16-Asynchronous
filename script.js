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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
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
const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1

  getJson(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJson(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))

    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })

    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});

getCountryData('australia');

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
