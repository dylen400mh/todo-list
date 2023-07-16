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

    const newTodoModal = {
        element: document.querySelector("#new-todo-modal"),
        titleField: document.querySelector("#new-todo-modal .todo-title"),
        descField: document.querySelector("#new-todo-modal .todo-description"),
        dueDateField: document.querySelector("#new-todo-modal .todo-date"),
        priorityField: document.querySelector("#new-todo-modal .todo-priority"),
        errorText: document.querySelector("#new-todo-modal .error-text"),
    }

    return { newProjectModal, editProjectModal, newTodoModal };
})();


export default Modals;