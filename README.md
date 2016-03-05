# Observer Pattern with Event Emitters

## Overview

You've learned that you can use modules and the callback patterns to mitigate some of the issues of the callback hell. However, there are other ways to organize your asynchronous code. The problem with callback even in modules is that there is only one type of the event, i.e., end result. We cannot trigger some intermittent logic. Also we cannot specify multiple callbacks (unless we pass multiple arguments or an array of callback which is hard to comprehend). We cannot easily tell the system to execute the callback just once if we have multiple places where that callback is called.

This lesson will cover the observer pattern implemented by event emitters. It's cornerstone to the Node, because it's use in many core modules as well as many npm modules (so called userland). Knowing this pattern will help you to use the modules. In addition, you'll be able to write your own modules/classes with this pattern. Also, in this code-along lesson you will see how to build a web crawler. It will take a URL and save the HTTP response into a file. 

## Objectives

1. Describe event emitter pattern
1. Implement an event emitter (inheriting from the base class with util.inherits)
1. Observe the event emitter pattern in most of Node core modules
1. Describe about some of the event from http module
1. Describe how to parse the information from the response

## Observer Pattern

The observer pattern is common in most of the programming languages. In a nutshell, you have one object which listens to events. Those events can be triggered in multiple places at a different times. By creating event listeners, developers can add some logic which they want to execute on a certain event. For example, you have a button on a web page. You want to see an image when the button is clicked. You can set up an event `onClick` and implement event listener with some browser JavaScript which will show the image.

In Node, we use Event Emitter class to implement an observer. 

## Event Emitter

The Event Emitter object can listen to events. To create it, import the core module `events` and instantiate the object with `new`:


```js
var events  = require('events')
var emitter = new events.EventEmitter()
```

To illustrate how Event Emitter works, we will create an object which can listen to event `knock`. Go ahead and create a file `knock-knock.js`. Create the `emitter` object as shown above, and implement two event listeners:


```js
emitter.on('knock', function() {
    console.log('Who\'s there?')
})

emitter.on('knock', function() {
    console.log('Go away!')
})
```

```js
emitter.emit('knock')
```

Run your newly created Node script with this command:

```
node knock-knock.js
```

You should see the output produced by two event listeners in the order in which they were defined because the event `knock` was triggered by the last statement:

```
Who's there?
Go away!
```

Just for fun, add another `emitter.emit('knock')`. There would be there output:

```
Who's there?
Go away!
Who's there?
Go away!
```

To summarize, we defined two event different listeners for the same arbitrary (means you can name this event anyway you want) event `knock`. Then we triggered the event twice. 

Additional methods include:

* `emitter.listeners(eventName)`: List the event listeners associated with the `eventName` event
* `emitter.once(eventName, listener)`: Create event listener for `eventName` and execute it just one time, i.e., analogous to `.on()` but fires only once.
* `emitter.removeListener(eventName, listener)`: Remove event listener for `eventName`

In our knock-knock example, we used the observer object `event`. It's not very interesting because it didn't do much. What's more interesting and useful is that we can extend Event Emitter properties and methods into ANY OBJECT/class. There's this convenient function `inherits()` from the core `util` module. It take child (`fancyChildObjectWithEvents`) and parent objects, and make the child inherit from the parent (Event Emitter).

```js
var util = require('util')
var events  = require('events')
util.inherits(fancyChildObjectWithEvents, events.EventEmitter)
```

Imagine a situation when you're developing an email job module. This module needs to be flexible enough to send different notifications when the job is done: weekly, daily and monthly. 

Event listeners can be located in different places than the class. This feature is useful for our email job class. We will create the class in `job.js`, then set up event listeners in `weekly.js`.

The `job.js` has module imports:

```js
// job.js
var util = require('util')
var events = require('events')
```

Then create a class/object `Job` using pseudo-classical pattern. It must have `process` method which will launch the email job. Inside of that method, emit the `done` event when everything is finished - async! And one more thing, we can pass any data in the `emit` method. In this example, pass the time&date.

```js
var Job = function Job() {
  var job = this // We'll use it later to pass 'this' to closures
  // ...
  job.process = function() {
    // ...
    setTimeout(function(){ // Emulate the delay of the job - async!
      job.emit('done', { completedOn: new Date() })
    }, 700)
  }
}
```

Now, extend the events and export the class:

```js
util.inherits(Job, events.EventEmitter)
module.exports = Job
```


In the `weekly.js` file, you'll consume the `Job` and implement the custom event listener. In this case, it's a weekly email runner so the event listener will print `Weekly...`:

```js
// weekly.js
var Job = require('./job.js')
var job = new Job()

job.on('done', function(details){
  console.log('Weekly email job was completed at', details.completedOn)
})

job.process()
```

This is how you customize behavior of your classes by specifying event listeners later in different files! As mentioned before, the advantage over callbacks is that you can have multiple events, remove them, execute them once, etc. The reverse is possible, i.e., having an event listener in `job.js` and triggering the event in `weekly.js`. 

```js
// job.js
// ...
job.on('start', function(){
  job.process()
})
```

The result is similar to invoking `job.process()` directly.

```js
// weekly.js
job.emit('start')
```

## HTTP Request

You've learned how to implement classes which inherit events. You also know how to listen and trigger events. Let's do something fun and see how to apply this knowledge to the probably one of the most important modules in Node—`http`.

You see, `http` as well as many other core modules, use observer pattern. For example, you must listen to events when receiving data from an outgoing HTTP request (your script is a client).



## Resources

1. []()
1. []()
1. []()


---

<a href='https://learn.co/lessons/node-non-blocking-observer' data-visibility='hidden'>View this lesson on Learn.co</a>
