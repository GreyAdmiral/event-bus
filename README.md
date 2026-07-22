# event-bus

> Simple Event Bus library built for any JavaScript application.

## Install

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@binarion/event-bus@1.0.2/dist/event-bus.min.js"></script>
```

or

```html
<script src="https://unpkg.com/@binarion/event-bus@1.0.2/dist/event-bus.min.js"></script>
```

#### Import

Run the command in the console

```shell
npm i @binarion/event-bus
```

Perform the import

```javascript
const EventBus = require('@binarion/event-bus');
```

or

```javascript
import EventBus from '@binarion/event-bus';
```

## Methods

### on

##### Arguments:

1. The name (can be absolutely anything) of the custom event that will be generated in the future.

2. A function that will be executed when the event specified in the first argument is generated.

##### Description:

Creates a subscription to an event whose name is specified in the first argument of the method and with the handler function specified in the second argument of the method.

### once

##### Arguments:

1. The name (can be absolutely anything) of the custom event that will be generated in the future.

2. A function that will be executed when the event specified in the first argument is generated.

##### Description:

Creates a one-time subscription to an event whose name is specified in the first argument of the method and with the handler function specified in the second argument of the method.

### off

##### Arguments:

1. The name (can be absolutely anything) of the custom event that will be generated in the future.

2. A function that will be executed when the event specified in the first argument is generated.

##### Description:

Disables execution of the handler function specified in the second argument of the method for the event whose name is specified in the first argument of the method.

### emit

##### Arguments:

1. The name (can be absolutely anything) of the custom event that will be generated in the future.

2. Arguments that will be passed to the handler function. Can be of any type and in any quantity.

##### Description:

Triggers an event whose name is specified in the first argument of the method and passes all other arguments to the handler function.

## Usage

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@binarion/event-bus@1.0.2/dist/event-bus.min.js"></script>

...

<script>
   var customEventName = 'my-custom-event';
   var testCb = () => {
      console.log('Event subscription activated');
   };

   eventBus.on(customEventName, testCb);

   ...

   eventBus.emit(customEventName);
</script>
```

or

```html
<script>
   var customEventName = 'my-custom-event';
   var testCb = (eventName) => {
      console.log('Event Subscription ' + eventName + ' activated');
   };

   eventBus.on(customEventName, testCb);

   ...

   eventBus.emit(customEventName, customEventName);
</script>
```

#### Import

```javascript
const EventBus = require('@binarion/event-bus');

const customEventName = 'my-custom-event';
const eventBus = new EventBus();
const testCb = () => {
   console.log('Event subscription activated');
};

eventBus.on(customEventName, testCb);

...

eventBus.emit(customEventName);
```

or

```javascript
const EventBus = require('@binarion/event-bus');

const customEventName = 'my-custom-event';
const eventBus = new EventBus();
const testCb = (eventName) => {
   console.log('Event Subscription ' + eventName + ' activated');
};

eventBus.on(customEventName, testCb);

...

eventBus.emit(customEventName);
```
