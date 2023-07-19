const Info = (() => {
    let projects = [{ title: "All", todos: getAllTodos(), selected: true }, { title: "First Project", todos: [{ title: "Walk my dog", description: "I need to walk my dog today.", date: "2023-07-16", priority: "high", complete: false }], selected: true }];

    // function returns an array with all todos
    const getAllTodos = () => {
        let allTodos = [];

        for (let project of projects) {
            for (let todo of project.todos) {
                allTodos.push(todo);
            }
        }
        return allTodos;
    }

    return { projects };
})();

export default Info;