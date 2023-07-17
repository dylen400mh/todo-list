import Info from "./Info.js";
import Handler from "./Handler.js";
import Modals from "./Modals.js";

const DOM = (() => {
    const modal = document.querySelector(".modal");
    const projectsContainer = document.querySelector(".projects");
    const todosContainer = document.querySelector(".todos");

    // display corresponding modal based on button click (DOESNT APPLY TO EVERY PROJECT)
    function displayModal(modalClicked, projectIndex = null, todoIndex = null) {
        modal.style.display = "block"; //modal general display

        // new modals
        if (modalClicked === Modals.newProjectModal || modalClicked === Modals.newTodoModal) {
            showModal(modalClicked);
        }
        // todo-related modals
        if (modalClicked === Modals.editTodoModal || modalClicked === Modals.todoInfoModal) {

            const project = Info.projects[projectIndex];
            const todo = project.todos[todoIndex]

            const title = todo.title;
            const description = todo.description;
            const date = todo.date;
            const priority = todo.priority;

            // if todo info modal grab extra values
            if (modalClicked === Modals.todoInfoModal) {
                const complete = todo.complete;
                const projectTitle = project.title;

                showModal(modalClicked, title, description, date, priority, complete, projectTitle);
            }

            // if edit todo modal
            else {
                showModal(modalClicked, title, description, date, priority);
            }

        }
        //edit project modal
        if (modalClicked === Modals.editProjectModal) {
            const title = Info.projects[projectIndex].title;
            showModal(modalClicked, title);
        }
    }

    function showModal(modal, title = "", description = "", date = "", priority = "", complete = "", project = "") {
        modal.element.style.display = "block";

        // modify textContent if todo info modal clicked
        if (modal === Modals.todoInfoModal) {
            modal.titleField.textContent = title;
            modal.descField.textContent = description;
            modal.dueDateField.textContent = date;
            modal.priorityField.textContent = priority;
            modal.completeField.textContent = complete;
            modal.projectField.textContent = project;
        }

        // if todo info field wasn't clicked
        else {
            modal.titleField.value = title;
            modal.titleField.focus();

            // set additional fields for edit todo modal
            if (modal === Modals.editTodoModal) {
                modal.descField.value = description;
                modal.dueDateField.value = date;
                modal.priorityField.value = priority;
            }
        }
    }

    // resets input fields / error messages
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

        if (modalToClose !== Modals.todoInfoModal) {
            resetModalFields(modalToClose);
        }
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
            editButton.addEventListener("click", (e) => {
                Handler.handleEditButtonClick(e, "project")
            });

            // Only add a delete button if there is more than one project. We always want at least one project.
            if (Info.projects.length > 1) {
                const deleteButton = document.createElement("img");
                deleteButton.src = "../src/images/icons8-delete-24.png";
                deleteButton.classList.add("delete-button");
                deleteButton.classList.add("delete-project-button");
                deleteButton.addEventListener("click", (e) => {
                    Handler.handleDeleteButtonClick(e, "project")
                })

                // add each button to action buttons div
                actionButtons.append(editButton, deleteButton);
            } else {
                actionButtons.appendChild(editButton);
            }

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
            const dueDate = document.createElement("div");
            dueDate.classList.add("date");
            dueDate.textContent = allTodos[i].date;

            // add checkbox and todo title styles then add to info
            addTodoStyles(allTodos[i], checkbox, todoTitle);
            todoInfo.append(checkbox, todoTitle, dueDate);

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const editButton = document.createElement("img");
            editButton.src = "../src/images/icons8-edit-30.png";
            editButton.classList.add("edit-button");
            editButton.classList.add("edit-todo-button");
            editButton.addEventListener("click", (e) => {
                e.stopPropagation(); // prevents todo from being toggled complete
                Handler.handleEditButtonClick(e, "todo");
            });

            const deleteButton = document.createElement("img");
            deleteButton.src = "../src/images/icons8-delete-24.png";
            deleteButton.classList.add("delete-button");
            deleteButton.classList.add("delete-todo-button");
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation(); // prevents todo from being toggled complete
                Handler.handleDeleteButtonClick(e, "todo");
            })

            const infoButton = document.createElement("img");
            infoButton.src = "../src/images/icons8-info-24.png";
            infoButton.classList.add("info-button");
            infoButton.addEventListener("click", (e) => {
                e.stopPropagation(); //prevents todo from being toggled complete
                Handler.handleTodoInfoClick(e);
            })

            // add each button to action buttons div
            actionButtons.append(editButton, deleteButton, infoButton);

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

    // update display
    function updateDisplay() {
        displayProjects();
        displayTodos();
    }

    return { displayModal, closeModal, displayError, updateDisplay };
})();

export default DOM;