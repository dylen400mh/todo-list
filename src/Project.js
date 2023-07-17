export default class Project {

    constructor(title) {
        this.title = title;
        this.todos = [];
        this.selected = false;
    }

    get title() {
        return this._title;
    }

    set title(ti) {
        this._title = ti;
    }

    set selected(select) {
        this._selected = select;
    }

    get selected() {
        return this._selected;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos.pop(todo);
    }
}