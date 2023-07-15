import Info from "./Info.js";

const DOM = (() => {
    const modal = document.querySelector(".modal");
    const errorText = document.querySelector(".error-text");
    const projectTitleField = document.querySelector("#project-title");
    const projectsContainer = document.querySelector(".projects");

    function displayModal() {
        modal.style.display = "block";
    }

    function resetModalFields() {
        errorText.style.display = "none";
        projectTitleField.value = "";
    }

    function closeModal() {
        modal.style.display = "none";
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

            const projectTitle = document.createElement("span");
            projectTitle.textContent = Info.projects[i].title;

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const editButton = document.createElement("img");
            editButton.src = "../src/images/icons8-edit-30.png";
            editButton.classList.add("edit-button");

            const deleteButton = document.createElement("img");
            deleteButton.src = "../src/images/icons8-delete-24.png";
            deleteButton.classList.add("delete-button");

            // add each button to action buttons div
            actionButtons.append(editButton, deleteButton);

            // add title + buttons to project container
            projectContainer.append(projectTitle, actionButtons);

            // add project container to projects list 
            projectsContainer.appendChild(projectContainer);
        }
    }

    return { displayModal, closeModal, displayError, displayProjects }
})();

export default DOM;