**Installation**

`npm install ah-bluebird-plugin --save` **or** `yarn add ah-bluebird-plugin`

Install plugin using instructions from https://www.actionherojs.com/docs/core/#plugins

Now try returning a promise inside of an action! The promise's result will be set at data.result and the request completed. If anything lands in the .catch(err) method, it'll pipe through AH's error formatter. 

**Example Action:**
```
var Bluebird = require('bluebird');

exports.promiseExample = {
  name: 'promiseExample',
  description: 'I am an example of an action returning a promise',
  outputExample: {
    result:"hello world!",
    action:"promiseExample",
    serverInformation:Object,
    requestDuration:5,
  },
  inputs: {},

  run: function (api, data, next) {
    return new Bluebird.Promise(function(resolve, reject){
      resolve('hello world!');
    })
  }
}
```
