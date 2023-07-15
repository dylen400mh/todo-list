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

    function getProject(index) {
        return Info.projects[index];
    }

    function editProject(project, title) {
        project.title = title;
        DOM.displayProjects();
    }

    // validate form
    function validateForm(e) {
        const title = e.target.closest(".modal-content").querySelector("input").value;
        const openModal = getOpenModal();

        if (title !== "") {
            if (openModal === Modals.newProjectModal) {
                addProject(title);
            } else if (openModal === Modals.editProjectModal) {
                editProject(getProject(projectIndex), title);
            }

            DOM.closeModal(openModal);
        } else {
            DOM.displayError(openModal);
        }
    }



    // handle edit button click
    function handleEditButtonClick(e) {
        projectIndex = getProjectIndex(e); // overwrite global variable
        DOM.displayModal(Modals.editProjectModal, projectIndex);
    }

    // display new project modal
    newProjectButton.addEventListener("click", (e) => {
        DOM.displayModal(Modals.newProjectModal);
    })

    // display edit project modal
    editProjectButtons.forEach(button => {
        button.addEventListener("click", handleEditButtonClick)
    })

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
        button.addEventListener("click", (e) => {
            validateForm(e);
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && modal.style.display === "block") {
                validateForm(e);
            }
        })
    })


    return { handleEditButtonClick }
})();

export default Handler;