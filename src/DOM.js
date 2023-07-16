import Info from "./Info.js";
import Handler from "./Handler.js";
import Modals from "./Modals.js";

const DOM = (() => {
    const modal = document.querySelector(".modal");
    const projectsContainer = document.querySelector(".projects");

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

    return { displayModal, closeModal, displayError, displayProjects };
})();

export default DOM;