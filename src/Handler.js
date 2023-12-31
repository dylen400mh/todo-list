import DOM from "./DOM.js";
import Info from "./Info.js";
import Project from "./Project.js";
import Modals from "./Modals.js";
import Todo from "./Todo.js";

const Handler = (() => {
    const newProjectButton = document.querySelector(".new-project-button");
    const modal = document.querySelector(".modal");
    const confirmModalButtons = document.querySelectorAll(".confirm-button");

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

        // change project corresponding with each todo
        project.todos.map(todo => todo.projectTitle = title);

    }

    // delete project by splicing projects array at project's index
    function deleteProject(selectedProject) {
        const projectIndex = Info.projects.findIndex(project => project === selectedProject);
        Info.projects.splice(projectIndex, 1);
    }

    // create new todo
    function addTodo(title, description, dueDate, priority, projectTitle) {
        const todo = new Todo(title, description, dueDate, priority, projectTitle);
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
        const selectedTodo = getTodo(index);
        const title = selectedTodo.projectTitle;

        // find todo's project
        const project = Info.projects.find(project => project.title === title);
        const todoIndex = project.todos.findIndex(todo => todo == selectedTodo)

        // delete todo from project
        project.todos.splice(todoIndex, 1);
    }

    // edit a todo
    function editTodo(todo, title, description, date, priority) {
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.priority = priority;
    }

    // toggle complete/incomplete status todo
    function toggleComplete(index) {
        const todo = getTodo(index);
        todo.complete = !todo.complete;
    }

    // returns boolean whether the title exists or not
    function checkExistingTitles(title) {
        return Info.getAllFilters().find(filter => filter.title === title);
    }

    // validate form
    function validateForm(modal) {
        const title = modal.titleField.value; //get title from input box
        const projectTitle = getSelectedFilter().title

        // display error if no title
        if (!title) {
            DOM.toggleErrorMessages(modal, true, false); // displays empty error, but not taken error
            return;
        }

        // if project modal, check if the project name is taken (the last condition doesn't consider the current project's title)
        if ((modal === Modals.newProjectModal || modal === Modals.editProjectModal) && checkExistingTitles(title) && selectedFilter.title !== title) {
            DOM.toggleErrorMessages(modal, false, true); // displays taken error, but not empty error
            return;
        }

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
            const description = modal.descField.value;
            const dueDate = modal.dueDateField.value;
            const priority = modal.priorityField.value;
            addTodo(title, description, dueDate, priority, projectTitle);
        }
        // edit existing todo
        else if (modal === Modals.editTodoModal) {
            const description = modal.descField.value;
            const dueDate = modal.dueDateField.value;
            const priority = modal.priorityField.value;
            editTodo(getSelectedFilter().todos[index], title, description, dueDate, priority)
        }

        DOM.closeModal(modal);

        // save updated info to localStorage
        Info.saveToLocalStorage();

        DOM.updateDisplay();
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
        return Info.getAllFilters().find(filter => filter.title === title);
    }

    // returns selected project/filter - used to manipulate its todos/display
    function getSelectedFilter() {
        return Info.getAllFilters().find(filter => filter.selected);
    }

    // handle edit button click
    function handleEditButtonClick(e, object) {
        // if todo edit button is clicked
        if (object === "todo") {
            index = getTodoIndex(e);
            DOM.displayModal(e, Modals.editTodoModal, index);
        }

        // if project edit button is clicked
        if (object === "project") {
            selectedFilter = getFilterObject(e);
            DOM.displayModal(e, Modals.editProjectModal);
        }
    }

    // handle delete button click
    function handleDeleteButtonClick(e, object) {
        // get index based on type of object (todo or project)
        if (object === "todo") {
            deleteTodo(getTodoIndex(e));
        }

        if (object === "project") {
            deleteProject(getFilterObject(e));
        }

        // save updated info to localStorage
        Info.saveToLocalStorage();

        DOM.updateDisplay();
    }

    // handle todo click (toggling complete)
    function handleTodoClick(e) {
        toggleComplete(getTodoIndex(e));

        // save updated info to localStorage
        Info.saveToLocalStorage();

        DOM.updateDisplay();
    }

    // handles todo info button click
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

        // save updated info to localStorage
        Info.saveToLocalStorage();

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
            const allTodosFilter = Info.filters.find(filter => filter.title === "All");
            allTodosFilter.selected = true;
        }
    }

    // handles new todo button click
    function HandleNewTodoClick(e) {
        DOM.displayModal(e, Modals.newTodoModal);
    }

    // used in DOM module to add event listeners to buttons
    function addClickListener(button, clickHandler) {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            clickHandler(e);
        });
    }

    // display new project modal
    function HandleNewProjectClick(e) {
        DOM.displayModal(e, Modals.newProjectModal);
    }

    // close modal
    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal") || e.target.classList.contains("cancel-button")) {
            DOM.closeModal(getOpenModal());
        }
    });

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

    return { handleEditButtonClick, handleDeleteButtonClick, handleTodoClick, handleTodoInfoClick, handleFilterClick, HandleNewTodoClick, setDefaultFilter, getSelectedFilter, getFilterObject, unselectProject, selectProject, addClickListener, HandleNewProjectClick }
})();

export default Handler;