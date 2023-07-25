import Info from "./Info.js";
import Handler from "./Handler.js";
import Modals from "./Modals.js";

const DOM = (() => {
    const modal = document.querySelector(".modal");
    const projectsContainer = document.querySelector(".projects");
    const todosContainer = document.querySelector(".todos");
    const filtersContainer = document.querySelector(".filters");
    const todosTitleContainer = document.querySelector(".todos-title");
    const todosTitle = todosTitleContainer.querySelector("span");

    // display corresponding modal based on button click
    function displayModal(e, modalClicked, todoIndex = null) {
        modal.style.display = "block"; //modal general display

        // new modals
        if (modalClicked === Modals.newProjectModal || modalClicked === Modals.newTodoModal) {
            showModal(modalClicked);
        }
        // todo-related modals
        if (modalClicked === Modals.editTodoModal || modalClicked === Modals.todoInfoModal) {

            const selectedFilter = Handler.getSelectedFilter();
            const todo = selectedFilter.todos[todoIndex];

            const title = todo.title;
            const description = todo.description;
            const date = todo.date;
            const priority = todo.priority;

            // if todo info modal grab extra values
            if (modalClicked === Modals.todoInfoModal) {
                const complete = todo.complete;
                const projectTitle = todo.projectTitle;

                // find todo's project
                const project = Info.projects.find(project => project.title === projectTitle);

                showModal(modalClicked, title, description, date, priority, complete, project.title);
            }

            // if edit todo modal
            else {
                showModal(modalClicked, title, description, date, priority);
            }

        }
        //edit project modal
        if (modalClicked === Modals.editProjectModal) {
            const title = Handler.getFilterObject(e).title;
            showModal(modalClicked, title);
        }
    }

    // show modal and set fields based on todo/project info
    function showModal(modal, title = "", description = "", date = "", priority = "", complete = "", project = "") {
        modal.element.style.display = "block";

        // modify textContent if todo info modal clicked
        if (modal === Modals.todoInfoModal) {

            // captialize priority status to be displayed to screen
            priority = priority.charAt(0).toUpperCase() + priority.slice(1);

            modal.titleField.textContent = title;
            modal.descField.textContent = description;
            modal.dueDateField.textContent = date;
            modal.priorityField.textContent = priority;
            modal.completeField.textContent = (complete) ? "Yes" : "No";
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

                const option = modal.priorityField.querySelector("option[value=" + priority + "]");
                option.selected = true
            }
        }
    }

    // resets input fields / error messages
    function resetModalFields(modal) {
        toggleErrorMessages(modal, false, false); // disables both error messages
        modal.titleField.value = "";

        // reset additional fields for todo modals
        if (modal === Modals.newTodoModal) {
            modal.descField.value = "";
            modal.dueDateField.value = "";
            modal.priorityField.selectedIndex = 0;
        }
    }

    // closes modal and resets modal fields
    function closeModal(modalToClose) {
        modal.style.display = "none";
        modalToClose.element.style.display = "none";

        if (modalToClose !== Modals.todoInfoModal) {
            resetModalFields(modalToClose);
        }
    }

    // toggles error messages
    function toggleErrorMessages(modal, displayEmptyError, displayTakenError) {
        modal.emptyErrorText.style.display = displayEmptyError ? "block" : "none";

        // only toggle taken error for project modals
        if (modal === Modals.newProjectModal || modal === Modals.editProjectModal) {
            modal.takenErrorText.style.display = displayTakenError ? "block" : "none";
        }
    }

    // clears dynamic DOM elements from page
    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    // adds filters to display
    function displayFilters() {
        for (let i = 0; i < Info.filters.length; i++) {
            const filterContainer = document.createElement("div");
            filterContainer.classList.add("sidebar-container");
            filterContainer.setAttribute("title", Info.filters[i].title);

            // add click handler
            Handler.addClickListener(filterContainer, (e) => {
                Handler.handleFilterClick(e);
            })

            // if this filter is selected, add the selected style
            if (Info.filters[i].selected) {
                addSelectedStyle(filterContainer);
            }

            const filterTitle = document.createElement("span");
            filterTitle.textContent = Info.filters[i].title;

            filterContainer.appendChild(filterTitle);
            filtersContainer.appendChild(filterContainer);
        }
    }

    function displayProjects() {
        // add each project to page
        for (let i = 0; i < Info.projects.length; i++) {
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("sidebar-container");
            projectContainer.setAttribute("title", Info.projects[i].title);

            // add click handler
            Handler.addClickListener(projectContainer, (e) => {
                Handler.handleFilterClick(e);
            })

            // if this project is selected, add the selected style
            if (Info.projects[i].selected) {
                addSelectedStyle(projectContainer);
            }

            const projectTitle = document.createElement("span");
            projectTitle.textContent = Info.projects[i].title;

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const editButton = document.createElement("img");
            editButton.src = "../src/images/icons8-edit-30.png";
            editButton.classList.add("edit-button");
            editButton.classList.add("edit-project-button");

            // add click handler
            Handler.addClickListener(editButton, (e) => {
                Handler.handleEditButtonClick(e, "project");
            })

            // Only add a delete button if there is more than one project. We always want at least one project.
            if (Info.projects.length > 1) {
                const deleteButton = document.createElement("img");
                deleteButton.src = "../src/images/icons8-delete-24.png";
                deleteButton.classList.add("delete-button");
                deleteButton.classList.add("delete-project-button");

                // add click handler
                Handler.addClickListener(deleteButton, (e) => {
                    Handler.handleDeleteButtonClick(e, "project");
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

    // dynamically updates filter/project title in content container
    function updateContentHeader() {
        todosTitle.textContent = Handler.getSelectedFilter().title;

        // add the button if the selected filter is a project
        if (Info.projects.includes(Handler.getSelectedFilter())) {
            displayAddTodoButton();
        }
    }

    // remove button from container (it will always be the last element)
    function removeAddTodoButton() {
        todosTitleContainer.removeChild(todosTitleContainer.lastChild);
    }

    // adds 'add todo' button to screen
    function displayAddTodoButton() {
        const addTodoButton = document.createElement("img");
        addTodoButton.src = "../src/images/icons8-add-32.png";
        addTodoButton.classList.add("add-button");
        addTodoButton.classList.add("new-todo-button");
        addTodoButton.addEventListener("click", (e) => {
            Handler.HandleNewTodoClick(e);
        });

        todosTitleContainer.appendChild(addTodoButton);
    }

    // display a project's todos
    function displayTodos() {
        // get selected filter
        const filter = Handler.getSelectedFilter();
        const todos = filter.todos;

        for (let i = 0; i < todos.length; i++) {
            const todoContainer = document.createElement("div");
            todoContainer.classList.add("content-container");
            todoContainer.setAttribute("index", i);
            todoContainer.addEventListener("click", Handler.handleTodoClick);

            const todoInfo = document.createElement("div");
            todoInfo.classList.add("todo-info");

            const checkbox = document.createElement("div");
            checkbox.classList.add("checkbox")
            const todoTitle = document.createElement("span");
            todoTitle.textContent = todos[i].title;
            const dueDate = document.createElement("div");
            dueDate.classList.add("date");
            dueDate.textContent = todos[i].date;

            // add checkbox and todo title styles then add to info
            addTodoStyles(todos[i], checkbox, todoTitle);
            todoInfo.append(checkbox, todoTitle, dueDate);

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const editButton = document.createElement("img");
            editButton.src = "../src/images/icons8-edit-30.png";
            editButton.classList.add("edit-button");
            editButton.classList.add("edit-todo-button");
            Handler.addClickListener(editButton, (e) => {
                Handler.handleEditButtonClick(e, "todo");
            })

            const deleteButton = document.createElement("img");
            deleteButton.src = "../src/images/icons8-delete-24.png";
            deleteButton.classList.add("delete-button");
            deleteButton.classList.add("delete-todo-button");
            Handler.addClickListener(deleteButton, (e) => {
                Handler.handleDeleteButtonClick(e, "todo");
            })

            const infoButton = document.createElement("img");
            infoButton.src = "../src/images/icons8-info-24.png";
            infoButton.classList.add("info-button");
            Handler.addClickListener(infoButton, (e) => {
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
        // complete todos
        if (todo.complete) {
            checkbox.classList.add("complete");
            todoTitle.style.textDecoration = "line-through";
        }

        // low priority
        if (todo.priority === "low") {
            todoTitle.style.color = "#32CD32";
        }

        // medium priority
        if (todo.priority === "medium") {
            todoTitle.style.color = "#DAA520";
        }

        // high priority
        if (todo.priority === "high") {
            todoTitle.style.color = "#FF6347";
        }
    }

    // clears display
    function clearDisplay() {

        // remove add todo button 
        if (todosTitleContainer.childElementCount > 1) removeAddTodoButton();
        clearElement(projectsContainer);
        clearElement(filtersContainer);
        clearElement(todosContainer);
    }

    // update display
    function updateDisplay() {
        // if no project/filter is selected, select 'all' filter
        Handler.setDefaultFilter();

        // clear display
        clearDisplay();


        updateContentHeader(); // update content title and add 'add todo' button if a project is selected
        displayFilters();
        displayProjects();
        displayTodos();
    }

    // select filter by adding the selected style
    function addSelectedStyle(container) {
        // add selected property to new element
        container.classList.add("selected");
    }

    return { displayModal, closeModal, toggleErrorMessages, updateDisplay };
})();

export default DOM;