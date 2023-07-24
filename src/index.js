import "./style.css";
import DOM from "./DOM.js";
import Handler from "./Handler.js";
import Info from "./Info.js";

// Set selected filter to "All" on page load
Handler.unselectProject();
Handler.selectProject(Info.filters[0]);

// add projects/filters to display
DOM.updateDisplay();





