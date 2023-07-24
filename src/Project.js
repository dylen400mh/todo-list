export default class Project {

    constructor(title) {
        this.title = title;
        this.todos = [];
        this.selected = false;
    }
    
    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos.pop(todo);
    }
}