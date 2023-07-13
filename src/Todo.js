export default class Todo {

    constructor(title, description = "", date = 0, priority = null) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    get title() {
        return this._title;
    }

    set title(ti) {
        this._title = ti;
    }

    get description() {
        return this._description;
    }

    set description(desc) {
        this._description = desc;
    }

    get date() {
        return this._date;
    }

    set date(dt) {
        this._date = dt;
    }

    get priority() {
        return this._priority;
    }

    set priority(pri) {
        this._priority = pri;
    }
}