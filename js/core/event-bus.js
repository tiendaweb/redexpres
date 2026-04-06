/**
 * Event Bus
 * Decoupled communication between modules
 */
const EventBus = (() => {
  const events = {};

  /**
   * Subscribe to an event
   * @param {string} eventName - Name of the event
   * @param {function} callback - Function to call when event is triggered
   */
  const on = (eventName, callback) => {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);

    // Return unsubscribe function
    return () => {
      events[eventName] = events[eventName].filter(cb => cb !== callback);
    };
  };

  /**
   * Subscribe to an event once
   * @param {string} eventName - Name of the event
   * @param {function} callback - Function to call when event is triggered
   */
  const once = (eventName, callback) => {
    const unsubscribe = on(eventName, (...args) => {
      callback(...args);
      unsubscribe();
    });
  };

  /**
   * Emit an event
   * @param {string} eventName - Name of the event
   * @param {*} data - Data to pass to listeners
   */
  const emit = (eventName, data = null) => {
    if (!events[eventName]) return;

    events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (e) {
        console.error(`Error in event listener for ${eventName}:`, e);
      }
    });
  };

  /**
   * Remove all listeners for an event
   * @param {string} eventName - Name of the event (optional)
   */
  const off = (eventName) => {
    if (eventName) {
      delete events[eventName];
    } else {
      Object.keys(events).forEach(key => delete events[key]);
    }
  };

  /**
   * Get all events
   */
  const getEvents = () => Object.keys(events);

  return {
    on,
    once,
    emit,
    off,
    getEvents,
  };
})();
