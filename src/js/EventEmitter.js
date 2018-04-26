export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    fire(event) {
        if (this.events[event]) {
            for (let i = this.events[event].length - 1; i >= 0; i--) {
                this.events[event][i]();
            }
        }
    }

    once(event, callback) {
        let onceCallback = () => {
            callback();
            this.off(event, onceCallback);
        }
        this.on(event, onceCallback);
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event, callback) {
        if (event in this.events) {
            this.events[event].splice(this.events[event].indexOf(callback), 1);
        } else {
            console.warn(`Trying to remove ${event} event, but it does not exist`);
        }
    }
}