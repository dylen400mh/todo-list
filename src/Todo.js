export default class Todo {

    constructor(title, description, date, priority, projectTitle) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.complete = false;
        this.projectTitle = projectTitle;
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

    get complete() {
        return this._complete;
    }

    set complete(comp) {
        this._complete = comp;
    }

    get projectTitle() {
        return this._projectTitle;
    }

    set projectTitle(pTitle) {
        this._projectTitle = pTitle;
    }
}