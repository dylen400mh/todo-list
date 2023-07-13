export default class Project {

    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    get title() {
        return this._title;
    }

    set title(ti) {
        this._title = ti;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos.pop(todo);
    }
}