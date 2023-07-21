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

    // create closures to store the selected filter or index for editing purposes
    let index;
    let selectedFilter;

    // create project and add to projects array
    function addProject(title) {
        const project = new Project(title);
        Info.projects.push(project);
    }

    // edit project by changing its title and updating display
    function editProject(project, title) {
        project.title = title;
    }

    // delete project by splicing projects array at project's index
    function deleteProject(selectedProject) {
        const projectIndex = Info.projects.findIndex(project => project === selectedProject);
        Info.projects.splice(projectIndex, 1);
    }

    // create new todo
    function addTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority);
        getSelectedFilter().todos.push(todo);
    }

    // get todo index
    function getTodoIndex(e) {
        return e.target.closest(".content-container").getAttribute("index");
    }

    // get todo object
    function getTodo(index) {
        return getSelectedFilter().todos[index];
    }

    // delete todo from project
    function deleteTodo(index) {
        getSelectedFilter().todos.splice(index, 1);
    }

    function editTodo(todo, title, description, date, priority) {
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.priority = priority;
    }

    // // toggle complete/incomplete status todo
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
                editProject(selectedFilter, title);
            }
            // create new todo
            else if (modal === Modals.newTodoModal) {
                addTodo(title, description, dueDate, priority);
            }
            // edit existing todo
            else if (modal === Modals.editTodoModal) {
                editTodo(getSelectedFilter().todos[index], title, description, dueDate, priority)
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
        const container = e.target.closest(".sidebar-container");
        const title = container.getAttribute("title");

        return Info.getAllFilters().filter(filter => filter.title === title)[0];
    }

    // returns selected project/filter - used to manipulate its todos/display
    function getSelectedFilter() {
        return Info.getAllFilters().filter(filter => filter.selected)[0]
    }

    // handle edit button click
    function handleEditButtonClick(e, object) {
        if (object === "todo") {
            index = getTodoIndex(e);
            DOM.displayModal(e, Modals.editTodoModal, index);
        }

        if (object === "project") {
            selectedFilter = getFilterObject(e);
            DOM.displayModal(e, Modals.editProjectModal);
        }
    }

    // handle delete button click (if i click delete the project isn't removed from array)
    function handleDeleteButtonClick(e, object) {
        // get index based on type of object (todo or project)
        if (object === "todo") {
            index = getTodoIndex(e);
            deleteTodo(index);
        }

        if (object === "project") {
            deleteProject(getFilterObject(e));
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
        DOM.displayModal(e, Modals.todoInfoModal, index)
    }

    // handles filter click
    function handleFilterClick(e) {
        selectedFilter = getFilterObject(e);

        // unselect current filter
        unselectProject()

        // select new filter
        selectProject(selectedFilter);

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
    newProjectButton.addEventListener("click", (e) => {
        DOM.displayModal(e, Modals.newProjectModal);
    })

    // display new todo modal
    newTodoButton.addEventListener("click", (e) => {
        DOM.displayModal(e, Modals.newTodoModal);
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

    return { handleEditButtonClick, handleDeleteButtonClick, handleTodoClick, handleTodoInfoClick, handleFilterClick, setDefaultFilter, getSelectedFilter, getFilterObject }
})();

export default Handler;