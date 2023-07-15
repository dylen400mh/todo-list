const Modals = (() => {
    const newProjectModal = {
        element: document.querySelector("#new-project-modal"),
        titleField: document.querySelector("#new-project-modal .project-title"),
        errorText: document.querySelector("#new-project-modal .error-text"),
    }

    const editProjectModal = {
        element: document.querySelector("#edit-project-modal"),
        titleField: document.querySelector("#edit-project-modal .project-title"),
        errorText: document.querySelector("#edit-project-modal .error-text"),
        }
    
    return { newProjectModal, editProjectModal };
})();
     

export default Modals;