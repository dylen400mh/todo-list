const Info = (() => {
    // initial project array with one todo
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

    // get all completed todos
    const getCompleteTodos = () => {
        return getAllTodos().filter(todo => todo.complete);
    }

    // get todos due today
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

    // get todos due this week
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

    // filter objects
    let filters = [{
        title: "All",
        todos: getAllTodos(),
        selected: false,
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

    // save data to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("filters", JSON.stringify(filters));
    }

    // get saved data from local storage
    const getFromLocalStorage = () => {
        const storedProjects = localStorage.getItem("projects");
        const storedFilters = localStorage.getItem("filters");

        // If no data in local storage, return predefined arrays
        if (!storedProjects || !storedFilters) {
            return {
                projects,
                filters,
            }
        }

        // If there is data in local storage, retrieve it and return
        return {
            projects: JSON.parse(storedProjects),
            filters: JSON.parse(storedFilters),
        };
    };

    // updates filters by calling functions to get todos
    const updateFilters = () => {
        const allFilter = filters.find(filter => filter.title === "All");
        const importantFilter = filters.find(filter => filter.title === "Important");
        const completeFilter = filters.find(filter => filter.title === "Completed");
        const todayFilter = filters.find(filter => filter.title === "Today");
        const thisWeekFilter = filters.find(filter => filter.title === "This Week");

        // update todos for each filter
        allFilter.todos = getAllTodos();
        importantFilter.todos = getImportantTodos();
        completeFilter.todos = getCompleteTodos();
        todayFilter.todos = getTodayTodos();
        thisWeekFilter.todos = getWeeklyTodos();
    }

    // Initialize projects and filters from localStorage on page load
    const { projects: storedProjects, filters: storedFilters } = getFromLocalStorage();
    projects = storedProjects;
    filters = storedFilters;

    return { projects, filters, getAllFilters, saveToLocalStorage };
})();

export default Info;