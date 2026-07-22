//@ts-check

export default class EventBus {
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

      return () => {
         return this.off(eventType, handler);
      };
   }

   /**
    * @param {string} eventType
    * @param {Function} handler
    * @returns {Function}
    */
   once(eventType, handler) {
      /** @param  {unknown[]} args */
      const originalHandler = (...args) => {
         handler(...args);
         this.off(eventType, originalHandler);
      };

      this.on(eventType, originalHandler);

      return () => {
         return this.off(eventType, originalHandler);
      };
   }

   /**
    * @param {string} eventType
    * @param {Function} handler
    * @returns {boolean}
    */
   off(eventType, handler) {
      const handlers = this.#listeners?.[eventType];

      if (handlers) {
         for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
               handlers.splice(i--, 1);

               if (handlers?.length === 0) {
                  delete this.#listeners[eventType];
               }

               return true;
            }
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

      if (eventListeners) {
         eventListeners.forEach((handler) => {
            handler(...args);
         });
      }
   }
}
