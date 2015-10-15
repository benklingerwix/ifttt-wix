'use strict';
const FireBase = require('firebase');
let ref;
let instances;

function promiseValues(instance) {
  return new Promise(function (resolve) {
    console.log(instances);
    instances.child(instance).once('value', function (data) {
      console.log(`requested data for instance ${instance} with data ${JSON.parse(data)}`);
      resolve(data.val());
    });
  });
}

function init(firebaseApp) {
  ref = new FireBase(`https://${firebaseApp}.firebaseio.com/`);
  console.log('Firebase up and running!');
  instances = ref.child('instances');
  if (!instances) {
    console.log('However, no instances');
  }
}

module.exports = {
  init,
  getProducts: instance => promiseValues(instance),
  setProducts: (instance, value) => instances.child(instance).set(value)
};
