class Todo {
    constructor(id, todo, status) {
        this.id = id;
        this.todo = todo;
        this.status = status;
    }
}

export let todoArr = [
    new Todo(1, "10 push-ups", false),
    new Todo(2, "20 sit-ups", false),
    new Todo(4, "Eat fruits", true),
    new Todo(5, "Learn JEST", true),
    new Todo(3, "30 squats", false),
    new Todo(6, "Learn optimization", true),
]