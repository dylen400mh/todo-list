import "./style.css";
import DOM from "./DOM.js";
import Handler from "./Handler.js";
import Info from "./Info.js";
import addButtonImg from "../src/images/icons8-add-32.png";

// get projects title container
const projectTitleContainer = document.querySelector(".projects-title");

// add 'add project' button to page on initial load
const addProjectButton = new Image();
addProjectButton.src = addButtonImg;
addProjectButton.classList.add("add-button");
addProjectButton.classList.add("new-project-button");
Handler.addClickListener(addProjectButton, (e) => {
    Handler.HandleNewProjectClick(e);
});

// add button to project title container
projectTitleContainer.appendChild(addProjectButton);

// Set selected filter to "All" on page load
Handler.unselectProject();
Handler.selectProject(Info.filters[0]);

// add projects/filters to display
DOM.updateDisplay();





