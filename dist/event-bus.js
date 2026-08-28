//@ts-check

class EventBus {
   /** @type {Record<string, Function[]>} #listeners */
   #listeners = {};

   /**
    * @param {string} eventType
    * @param {Function} handler
    * @returns {Function}
    */
   on(eventType, handler) {
      if (!this.#listeners[eventType]) {
         this.#listeners[eventType] = [];
      }

      this.#listeners[eventType].push(handler);
      return this.off.bind(this, eventType, handler);
   }

   /**
    * @param {string} eventType
    * @param {Function} handler
    * @returns {Function}
    */
   once(eventType, handler) {
      /** @param  {unknown[]} args */
      const originalHandler = (...args) => {
         this.off.call(this, eventType, originalHandler);
         handler(...args);
      };

      this.on(eventType, originalHandler);
      return this.off.bind(this, eventType, originalHandler);
   }

   /**
    * @param {string} eventType
    * @param {Function} handler
    * @returns {boolean}
    */
   off(eventType, handler) {
      const handlers = this.#listeners[eventType];

      if (Array.isArray(handlers)) {
         const index = handlers.indexOf(handler);

         if (~index) {
            handlers.splice(index, 1);

            if (handlers.length === 0) {
               delete this.#listeners[eventType];
            }

            return true;
         }
      }

      return false;
   }

   /**
    * @param {string} eventType
    * @param {Array<unknown>} args
    * @returns {void}
    */
   emit(eventType, ...args) {
      const eventListeners = this.#listeners[eventType];

      if (Array.isArray(eventListeners)) {
         const handlers = [...eventListeners];

         for (const handler of handlers) {
            try {
               handler(...args);
            } catch (error) {
               const message = error instanceof Error ? error.message : String(error);
               console.error(`Error in EventBus handler for event "${eventType}":`, message);
            }
         }
      }
   }

   /**
    * @param {string} eventType
    * @returns {void}
    */
   clearEvent(eventType) {
      delete this.#listeners[eventType];
   }

   /**
    * @returns {void}
    */
   clearAll() {
      this.#listeners = {};
   }
}

export { EventBus as default };
