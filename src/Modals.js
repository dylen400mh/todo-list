const Modals = (() => {
    const newProjectModal = {
        element: document.querySelector("#new-project-modal"),
        titleField: document.querySelector("#new-project-modal .project-title"),
        emptyErrorText: document.querySelector("#new-project-modal .empty"),
        takenErrorText: document.querySelector("#new-project-modal .taken")
    }

    const editProjectModal = {
        element: document.querySelector("#edit-project-modal"),
        titleField: document.querySelector("#edit-project-modal .project-title"),
        emptyErrorText: document.querySelector("#edit-project-modal .empty"),
        takenErrorText: document.querySelector("#edit-project-modal .taken")
    }

    const newTodoModal = {
        element: document.querySelector("#new-todo-modal"),
        titleField: document.querySelector("#new-todo-modal .todo-title"),
        descField: document.querySelector("#new-todo-modal .todo-description"),
        dueDateField: document.querySelector("#new-todo-modal .todo-date"),
        priorityField: document.querySelector("#new-todo-modal .todo-priority"),
        emptyErrorText: document.querySelector("#new-todo-modal .empty"),
    }

    const editTodoModal = {
        element: document.querySelector("#edit-todo-modal"),
        titleField: document.querySelector("#edit-todo-modal .todo-title"),
        descField: document.querySelector("#edit-todo-modal .todo-description"),
        dueDateField: document.querySelector("#edit-todo-modal .todo-date"),
        priorityField: document.querySelector("#edit-todo-modal .todo-priority"),
        emptyErrorText: document.querySelector("#edit-todo-modal .empty"),
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