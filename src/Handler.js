import DOM from "./DOM.js";
import Info from "./Info.js";
import Project from "./Project.js";
import Modals from "./Modals.js";
import Todo from "./Todo.js";

const Handler = (() => {
    const newProjectButton = document.querySelector(".new-project-button");
    const modal = document.querySelector(".modal");
    const cancelModalButtons = document.querySelectorAll(".cancel-button");
    const confirmModalButtons = document.querySelectorAll(".confirm-button");
    const newTodoButton = document.querySelector(".new-todo-button");

    // global variable
    let index;

    // create project and add to projects array
    function addProject(title) {
        const project = new Project(title);
        Info.projects.push(project);
    }

    // get project index
    function getProjectIndex(e) {
        return e.target.closest(".sidebar-container").getAttribute("index");
    }

    // return project at a specific index
    function getProject(index) {
        return Info.projects[index];
    }

    // edit project by changing its title and updating display
    function editProject(project, title) {
        project.title = title;
    }

    // delete project by splicing projects array at project's index
    function deleteProject(projectIndex) {
        Info.projects.splice(projectIndex, 1);
    }

    // create new todo
    function addTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority);
        const currentProject = Info.projects[0]; //GENERALIZE THIS LATER TO BE CHOSEN PROJECT
        currentProject.todos.push(todo);
    }

    // get todo index
    function getTodoIndex(e) {
        return e.target.closest(".content-container").getAttribute("index");
    }

    // get todo object (CHANGE LATER TO APPLY TO ANY PROJECT)
    function getTodo(index) {
        return Info.projects[0].todos[index];
    }

    // delete todo from project - ADJUST FOR ALL PROJECTS
    function deleteTodo(projectIndex, todoIndex) {
        Info.projects[projectIndex].todos.splice(todoIndex, 1);
    }

    function editTodo(todo, title, description, date, priority) {
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.priority = priority;
    }

    // // toggle complete/incomplete status todo (CHANGE TO APPLY TO ANY PROJECT)
    function toggleComplete(index) {
        const todo = getTodo(index);
        todo.complete = (todo.complete) ? false : true;
    }

    // validate form
    function validateForm(modal) {
        const title = modal.titleField.value; //get title from input box
        let description, dueDate, priority; // declare todo variables

        //if validating a todo form get the other values
        if (modal === Modals.newTodoModal || modal === Modals.editTodoModal) {
            description = modal.descField.value;
            dueDate = modal.dueDateField.value;
            priority = modal.priorityField.value;
        }

        // if a title was entered perform the appropriate action, else display error message
        if (title !== "") {
            // add new project
            if (modal === Modals.newProjectModal) {
                addProject(title);
            }
            // edit existing project
            else if (modal === Modals.editProjectModal) {
                editProject(getProject(index), title);
            }
            // create new todo
            else if (modal === Modals.newTodoModal) {
                addTodo(title, description, dueDate, priority);
            }
            // edit existing todo
            else if (modal === Modals.editTodoModal) {
                editTodo(getProject(0).todos[index], title, description, dueDate, priority)
            }

            DOM.closeModal(modal);
            DOM.updateDisplay();
        } else {
            DOM.displayError(modal);
        }
    }

    // unselects a project
    function unselectProject() {
        //check for selected filters
        if (getSelectedFilter()) {
            getSelectedFilter().selected = false
        }
    }

    // selects a project 
    function selectProject(project) {
        project.selected = true;
    }

    // returns filter object based on title
    function getFilterObject(e) {
        const container = e.target.closest(".sidebar-container")
        const title = container.getAttribute("title");

        return Info.filters.filter(filter => filter.title === title)[0];
    }

    // returns selected project/filter - used to manipulate its todos/display
    function getSelectedFilter() {
        return Info.getAllFilters().filter(filter => filter.selected)[0]
    }

    // handle edit button click (FIX THIS TO BE ANY PROJECT)
    function handleEditButtonClick(e, object) {
        if (object === "todo") {
            index = getTodoIndex(e);
            DOM.displayModal(Modals.editTodoModal, 0, index);
        }

        if (object === "project") {
            index = getProjectIndex(e);
            DOM.displayModal(Modals.editProjectModal, index);
        }
    }

    // handle delete button click
    function handleDeleteButtonClick(e, object) {
        // get index based on type of object (todo or project)
        if (object === "todo") {
            index = getTodoIndex(e);
            deleteTodo(0, index); // ADJUST FOR ALL PROJECTS (0 is default)
        }

        if (object === "project") {
            index = getProjectIndex(e);
            deleteProject(index);
        }

        DOM.updateDisplay()
    }

    // handle todo click (toggling complete)
    function handleTodoClick(e) {
        toggleComplete(getTodoIndex(e));
        DOM.updateDisplay();
    }

    // handles todo info button click (MAKE WORK FOR ANY PROJECT)
    function handleTodoInfoClick(e) {
        index = getTodoIndex(e);
        DOM.displayModal(Modals.todoInfoModal, 0, index)
    }

    // handles project click
    function handleProjectClick(e) {
        index = getProjectIndex(e);
        const project = Info.projects[index];

        // unselect current project
        unselectProject()

        // select new project
        selectProject(project);

        // if there are no selected filters, select 'all' filter
        setDefaultFilter();

        // update displays
        DOM.updateDisplay();
    }

    // handles filter click
    function handleFilterClick(e) {
        console.log(getFilterObject(e))
        const filter = getFilterObject(e);

        // unselect current filter
        unselectProject()

        // select new filter
        selectProject(filter);

        // update displays
        DOM.updateDisplay();
    }

    // get open modal reference
    function getOpenModal() {
        let openModal = null;

        // loops through each modal checking which one is open
        for (let modalKey in Modals) {

            if (Modals.hasOwnProperty(modalKey)) {
                const modal = Modals[modalKey];
                if (modal.element.style.display === "block") {
                    openModal = modal;
                }
            }
        }

        return openModal;
    }

    // if there are no selected filters, select 'all' filter
    function setDefaultFilter() {
        if (!getSelectedFilter()) {
            const allTodosFilter = Info.filters.filter(filter => filter.title === "All")[0];
            allTodosFilter.selected = true;
        }
    }

    // display new project modal
    newProjectButton.addEventListener("click", () => {
        DOM.displayModal(Modals.newProjectModal);
    })

    // display new todo modal
    newTodoButton.addEventListener("click", () => {
        DOM.displayModal(Modals.newTodoModal);
    })

    // close modal
    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            DOM.closeModal(getOpenModal());
        }
    });

    // cancel modal buttons
    cancelModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            DOM.closeModal(getOpenModal());
        });
    })

    // validate form if user clicks the confirm button OR hits enter when the modal is open
    confirmModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            validateForm(getOpenModal());
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && modal.style.display === "block") {
                validateForm(getOpenModal());
            }
        })
    })

    return { handleEditButtonClick, handleDeleteButtonClick, handleTodoClick, handleTodoInfoClick, handleProjectClick, handleFilterClick, setDefaultFilter }
})();

export default Handler;