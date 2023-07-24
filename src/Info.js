const Info = (() => {
    let projects = [{ title: "First Project", todos: [{ title: "Walk my dog", description: "I need to walk my dog today.", date: "2023-07-16", priority: "high", complete: false, projectTitle: "First Project" }], selected: false }];

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

    const getTodayTodos = () => {
        const todos = getAllTodos();
        const today = new Date();

        const todayTodos = todos.filter(todo => {
            const todoDate = parseDateString(todo.date);

            return (todoDate.getDate() === today.getDate() &&
                todoDate.getMonth() === today.getMonth() &&
                todoDate.getFullYear() === today.getFullYear());
        });

        return todayTodos;
    }

    const getWeeklyTodos = () => {
        const todos = getAllTodos();
        const today = new Date();
        const oneWeekToday = new Date();
        oneWeekToday.setDate(oneWeekToday.getDate() + 7);

        const weeklyTodos = todos.filter(todo => {
            const todoDate = parseDateString(todo.date);

            return (today <= todoDate && todoDate <= oneWeekToday);
        })

        return weeklyTodos;
    }

    // converts date string to date object
    const parseDateString = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return new Date(year, month - 1, day) // Month is 0-indexed in Date
    }

    // return array that contains all projects and filters
    const getAllFilters = () => {
        updateFilters();
        let array = []

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
        title: "Today",
        todos: getTodayTodos(),
        selected: false,
    },
    {
        title: "This Week",
        todos: getWeeklyTodos(),
        selected: false,
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

    // updates filters by calling functions to get todos
    const updateFilters = () => {
        const allFilter = filters.find(filter => filter.title === "All");
        const importantFilter = filters.find(filter => filter.title === "Important");
        const completeFilter = filters.find(filter => filter.title === "Completed");
        const todayFilter = filters.find(filter => filter.title === "Today");
        const thisWeekFilter = filters.find(filter => filter.title === "This Week");

        allFilter.todos = getAllTodos();
        importantFilter.todos = getImportantTodos();
        completeFilter.todos = getCompleteTodos();
        todayFilter.todos = getTodayTodos();
        thisWeekFilter.todos = getWeeklyTodos();
    }

    return { projects, filters, getAllFilters };
})();

export default Info;