
const Modals = (() => {
    const newProjectModal = {
        element: document.querySelector("#new-project-modal"),
        titleField: document.querySelector("#new-project-modal .project-title"),
        formInput: document.querySelector("#new-project-modal input"),
        errorText: document.querySelector("#new-project-modal .error-text"),
    }

    const editProjectModal = {
        element: document.querySelector("#edit-project-modal"),
        titleField: document.querySelector("#edit-project-modal .project-title"),
        formInput: document.querySelector("#edit-project-modal input"),
        errorText: document.querySelector("#edit-project-modal .error-text"),
    }

    return { newProjectModal, editProjectModal };
})();


export default Modals;