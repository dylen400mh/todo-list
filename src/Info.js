const Info = (() => {
    let projects = [{ title: "First Project", todos: [{ title: "Walk my dog", description: "I need to walk my dog today.", date: "2023-07-16", priority: "high", complete: false }], selected: false }];

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

    // function returns an array with high priority todos
    const getImportantTodos = () => {
        return getAllTodos().filter(todo => todo.priority === "high");
    }

    const getCompleteTodos = () => {
        return getAllTodos().filter(todo => todo.complete);
    }

    // return array that contains all projects and filters
    const getAllFilters = () => {
        console.log("info.projects")
        console.log(projects)
        let array = [];

        for (let filter of filters) {
            array.push(filter);
        }

        for (let project of projects) {
            array.push(project);
        }

        return array;
    }

    let filters = [{
        title: "All",
        todos: getAllTodos(),
        selected: true,
    },
    {
        title: "Important",
        todos: getImportantTodos(),
        selected: false
    },
    {
        title: "Completed",
        todos: getCompleteTodos(),
        selected: false
    }];


    return { projects, filters, getAllFilters };
})();

export default Info;