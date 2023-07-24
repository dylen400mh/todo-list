export default class Todo {
    constructor(title, description, date, priority, projectTitle) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.complete = false;
        this.projectTitle = projectTitle;
    }
}