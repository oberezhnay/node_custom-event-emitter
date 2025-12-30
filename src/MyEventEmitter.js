'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ fn: listener, once: false });
  }

  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ fn: listener, once: true });
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (obj) => obj.fn !== listener,
    );
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      const listEvent = (this.events[eventName] || []).concat();

      for (const obj of listEvent) {
        if (obj && typeof obj.fn === 'function') {
          obj.fn(...args);
        }

        if (obj.once === true) {
          this.events[eventName] = this.events[eventName].filter(
            (el) => el !== obj,
          );
        }
      }
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({ fn: listener, once: false });
  }

  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({ fn: listener, once: true });
  }

  removeAllListeners(eventName) {
    if (eventName !== undefined) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
