import DOM from "./DOM.js";
import Info from "./Info.js";
import Project from "./Project.js";

const Handler = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        const newProjectButton = document.querySelector("#new-project-button");
        const modal = document.querySelector(".modal");
        const cancelModalButton = document.querySelector(".cancel-button");
        const confirmModalButton = document.querySelector(".confirm-button");
        const projectTitleField = document.querySelector("#project-title");

        // modal popup
        newProjectButton.addEventListener("click", DOM.displayModal);

        // close modal
        modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal")) DOM.closeModal();
        });

        cancelModalButton.addEventListener("click", DOM.closeModal);

        // validate form
        function validateForm() {
            // check if there is a title entered. if there is grab it. if not display error msg
            const title = projectTitleField.value;

            if (title) {
                addProject(title);
                DOM.closeModal();
            } else {
                DOM.displayError();
            }
        }

        // validate form if user clicks the confirm button OR hits enter when the modal is open
        confirmModalButton.addEventListener("click", validateForm)
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && modal.style.display === "block") {
                validateForm();
            }
        })

        function addProject(title) {
            const project = new Project(title);
            Info.projects.push(project);
            DOM.displayProjects();
            console.log(Info.projects[0])
        }
    })

})();

export default Handler;