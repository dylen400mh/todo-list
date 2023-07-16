import Info from "./Info.js";
import Handler from "./Handler.js";
import Modals from "./Modals.js";

const DOM = (() => {
    const modal = document.querySelector(".modal");
    const projectsContainer = document.querySelector(".projects");
    const todosContainer = document.querySelector(".todos");

    // display corresponding modal based on button click
    function displayModal(modalClicked, projectIndex = null) {
        modal.style.display = "block"; //modal general display

        // new modals
        if (modalClicked === Modals.newProjectModal || modalClicked === Modals.newTodoModal) {
            showModal(modalClicked);
        }
        // edit modals
        else if (modalClicked === Modals.editProjectModal) {
            const projectTitle = Info.projects[projectIndex].title;
            showModal(modalClicked, projectTitle);
        }
    }

    function showModal(modal, title = "") {
        modal.element.style.display = "block";
        modal.titleField.value = title;
        modal.titleField.focus();
    }

    function resetModalFields(modal) {
        modal.errorText.style.display = "none";
        modal.titleField.value = "";

        // reset additional fields for todo modals
        if (modal === Modals.newTodoModal) {
            modal.descField.value = "";
            modal.dueDateField.value = "";
            modal.priorityField.value = "none";
        }
    }

    function closeModal(modalToClose) {
        modal.style.display = "none";
        modalToClose.element.style.display = "none";
        resetModalFields(modalToClose);
    }

    function displayError(modal) {
        modal.errorText.style.display = "block";
    }

    function clearProjects() {
        while (projectsContainer.firstChild) {
            projectsContainer.removeChild(projectsContainer.firstChild);
        }
    }

    function displayProjects() {

        // clear existing projects from display
        clearProjects();

        // add each project to page
        for (let i = 0; i < Info.projects.length; i++) {
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("sidebar-container");
            projectContainer.setAttribute("index", i);

            const projectTitle = document.createElement("span");
            projectTitle.textContent = Info.projects[i].title;

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const editButton = document.createElement("img");
            editButton.src = "../src/images/icons8-edit-30.png";
            editButton.classList.add("edit-button");
            editButton.classList.add("edit-project-button");
            editButton.addEventListener("click", Handler.handleEditButtonClick);

            const deleteButton = document.createElement("img");
            deleteButton.src = "../src/images/icons8-delete-24.png";
            deleteButton.classList.add("delete-button");
            deleteButton.classList.add("delete-project-button");
            deleteButton.addEventListener("click", Handler.handleDeleteButtonClick)

            // add each button to action buttons div
            actionButtons.append(editButton, deleteButton);

            // add title + buttons to project container
            projectContainer.append(projectTitle, actionButtons);

            // add project container to projects list 
            projectsContainer.appendChild(projectContainer);
        }
    }

    // clears todo display
    function clearTodos() {
        while (todosContainer.firstChild) {
            todosContainer.removeChild(todosContainer.firstChild);
        }
    }

    // display a project's todos (FOR NOW ITS JUST ALL OF THEM)
    function displayTodos() {
        // clear exisiting display
        clearTodos();

        const allTodos = Info.getAllTodos();

        for (let i = 0; i < allTodos.length; i++) {
            const todoContainer = document.createElement("div");
            todoContainer.classList.add("content-container");
            todoContainer.setAttribute("index", i);
            todoContainer.addEventListener("click", Handler.handleTodoClick);

            const todoInfo = document.createElement("div");
            todoInfo.classList.add("todo-info");

            const checkbox = document.createElement("div");
            checkbox.classList.add("checkbox")
            const todoTitle = document.createElement("span");
            todoTitle.textContent = allTodos[i].title;
            // HOW CAN I ADD DATE HERE

            // add checkbox and todo title styles then add to info
            addTodoStyles(allTodos[i], checkbox, todoTitle);
            todoInfo.append(checkbox, todoTitle);

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const editButton = document.createElement("img");
            editButton.src = "../src/images/icons8-edit-30.png";
            editButton.classList.add("edit-button");
            editButton.classList.add("edit-todo-button");
            editButton.addEventListener("click", Handler.handleEditButtonClick); //MAYBE CHANGE THIS

            const deleteButton = document.createElement("img");
            deleteButton.src = "../src/images/icons8-delete-24.png";
            deleteButton.classList.add("delete-button");
            deleteButton.classList.add("delete-todo-button");
            deleteButton.addEventListener("click", Handler.handleDeleteButtonClick) //MAYBE CHANGE THIS

            // add each button to action buttons div
            actionButtons.append(editButton, deleteButton);

            // add todo info and action buttons to each container
            todoContainer.append(todoInfo, actionButtons);

            // add container to todos display
            todosContainer.appendChild(todoContainer);
        }
    }

    // add complete/incomplete todo styles + priority colour coding
    function addTodoStyles(todo, checkbox, todoTitle) {
        if (todo.complete) {
            checkbox.classList.add("complete");
            todoTitle.style.textDecoration = "line-through";
        }

        if (todo.priority === "low") {
            todoTitle.style.color = "#32CD32";
        }

        if (todo.priority === "medium") {
            todoTitle.style.color = "#DAA520";
        }

        if (todo.priority === "high") {
            todoTitle.style.color = "#FF6347";
        }
    }

    return { displayModal, closeModal, displayError, displayProjects, displayTodos };
})();

export default DOM;