import DOM from "./DOM.js";
import Info from "./Info.js";
import Project from "./Project.js";
import Modals from "./Modals.js";

const Handler = (() => {
    const newProjectButton = document.querySelector(".new-project-button");
    const modal = document.querySelector(".modal");
    const cancelModalButtons = document.querySelectorAll(".cancel-button");
    const confirmModalButtons = document.querySelectorAll(".confirm-button");
    const editProjectButtons = document.querySelectorAll(".edit-project-button");
    const deleteProjectButtons = document.querySelectorAll(".delete-project-button");

    // global variable
    let projectIndex = null

    // create project and add to projects array
    function addProject(title) {
        const project = new Project(title);
        Info.projects.push(project);
        DOM.displayProjects(); //update display
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
        DOM.displayProjects();
    }

    // delete project by splicing projects array at project's index
    function deleteProject(projectIndex) {
        Info.projects.splice(projectIndex, 1);
    }

    // validate form
    function validateForm(modal) {
        const title = modal.titleField.value; //get title from input box

        // if a title was entered perform the appropriate action, else display error message
        if (title !== "") {
            if (modal === Modals.newProjectModal) {
                addProject(title);
            } else if (modal === Modals.editProjectModal) {
                editProject(getProject(projectIndex), title);
            }

            DOM.closeModal(modal);
        } else {
            DOM.displayError(modal);
        }
    }

    // handle edit button click
    function handleEditButtonClick(e) {
        projectIndex = getProjectIndex(e); // overwrite global variable
        DOM.displayModal(Modals.editProjectModal, projectIndex);
    }

    // handle delete button click
    function handleDeleteButtonClick(e) {
        projectIndex = getProjectIndex(e);
        deleteProject(projectIndex);
        DOM.displayProjects();
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

    // display new project modal
    newProjectButton.addEventListener("click", (e) => {
        DOM.displayModal(Modals.newProjectModal);
    })

    // display edit project modal
    editProjectButtons.forEach(button => {
        button.addEventListener("click", handleEditButtonClick);
    })

    // delete project button listener
    deleteProjectButtons.forEach(button => {
        button.addEventListener("click", handleDeleteButtonClick);
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

    return { handleEditButtonClick, handleDeleteButtonClick }
})();

export default Handler;