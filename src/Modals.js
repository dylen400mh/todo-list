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

    const editTodoModal = {
        element: document.querySelector("#edit-todo-modal"),
        titleField: document.querySelector("#edit-todo-modal .todo-title"),
        descField: document.querySelector("#edit-todo-modal .todo-description"),
        dueDateField: document.querySelector("#edit-todo-modal .todo-date"),
        priorityField: document.querySelector("#edit-todo-modal .todo-priority"),
        errorText: document.querySelector("#edit-todo-modal .error-text"),
    }

    const todoInfoModal = {
        element: document.querySelector("#todo-info-modal"),
        titleField: document.querySelector("#todo-info-modal .todo-title"),
        descField: document.querySelector("#todo-info-modal .todo-description"),
        dueDateField: document.querySelector("#todo-info-modal .todo-date"),
        priorityField: document.querySelector("#todo-info-modal .todo-priority"),
        completeField: document.querySelector("#todo-info-modal .todo-complete"),
        projectField: document.querySelector("#todo-info-modal .todo-project"),
    }

    return { newProjectModal, editProjectModal, newTodoModal, editTodoModal, todoInfoModal };
})();


export default Modals;