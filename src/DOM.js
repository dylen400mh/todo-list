import Info from "./Info.js";
import Handler from "./Handler.js";

const DOM = (() => {
    const modal = document.querySelector(".modal");
    const errorText = document.querySelectorAll(".error-text");
    const projectsContainer = document.querySelector(".projects");
    const newProjectModal = document.querySelector("#new-project-modal");
    const editProjectModal = document.querySelector("#edit-project-modal");
    const newProjectTitleField = newProjectModal.querySelector(".project-title");
    const editProjectTitleField = editProjectModal.querySelector(".project-title");

    function displayModal(elementClicked, projectIndex = null) {
        modal.style.display = "block";
        
        // display corresponding modal based on button click
        if (elementClicked.classList.contains("new-project-button")) {
            newProjectModal.style.display = "block";
        } else if (elementClicked.classList.contains("edit-project-button")) {
            editProjectTitleField.value = Info.projects[projectIndex].title;
            editProjectModal.style.display = "block";
        }
    }

    function resetModalFields() {
        errorText.style.display = "none";
        newProjectTitleField.value = "";
        editProjectTitleField.value = "";
    }

    function closeModal(modalToClose) {
        modal.style.display = "none";
        modalToClose.style.display = "none";
        resetModalFields();
    }

    function displayError() {
        errorText.style.display = "block";
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