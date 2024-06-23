class Task{
    // id: number
    // title: string
    // description: string
    // isCompleted: boolean
    // dueDate: string // 'Month-Date'
    constructor(id, title, description, isCompleted, dueDate){
        this.id = id;
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.dueDate = dueDate;
    }
}

export default Task;