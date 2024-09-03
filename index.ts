/*

Requisitos
La aplicación debe ejecutarse desde la línea de comandos, aceptar las acciones y entradas del usuario como argumentos y almacenar las tareas en un archivo JSON. El usuario debe poder:

*Agregar, 
*Actualizar 
*Eliminar tareas
*Listar todas las tareas
*Marcar una tarea como en progreso o realizada
*Enumere todas las tareas que no se han realizado
*Enumere todas las tareas que se realizan
*Enumere todas las tareas que están en curso
A continuación se presentan algunas restricciones para guiar la implementación:

*Puedes utilizar cualquier lenguaje de programación para construir este proyecto.
Utilice argumentos posicionales en la línea de comandos para aceptar entradas del usuario.
Utilice un archivo JSON para almacenar las tareas en el directorio actual.
Se debe crear el archivo JSON si no existe.
Utilice el módulo del sistema de archivos nativo de su lenguaje de programación para interactuar con el archivo JSON.
No utilice ninguna biblioteca o marco externo para crear este proyecto.
Asegúrese de manejar los errores y casos extremos con elegancia.
*/
/************************************************ */

/************************************************ */

enum TaskStatus {
    PENDING = 0,
    IN_PROGRESS = 1,
    DONE = 2
}

class Task {
    private id: number;
    private task: string;
    private status: TaskStatus;
    public static TASKS: Task[] = [];

    constructor(id: number, task: string, status: TaskStatus) {
        this.id = id;
        this.task = task;
        this.status = status;
    }

    public static AddTask(task: Task) {
        try {
            Task.TASKS.push(task);
            console.log(`Task added successfully (ID: ${task.id})`)
        } catch (error) {
            console.error(error);
        }
    }

    public static ViewTasks() {
        try {
            console.log("=============================");
            if (Task.TASKS.length === 0) {
                console.log("There are no tasks yet")
            }
            Task.TASKS.forEach((task) => {
                console.log("Objeto numero: ", task.id);
                console.log("Tarea: ", task.task);
                console.log("Estado: ", task.status);
                console.log("");
            })
            console.log("=============================");
        } catch (error) {
            console.error(error);
        }
    }

    public static DeleteTask(idTaskToDelete: number) {

        try {
            const initialSize = Task.TASKS.length;
            Task.TASKS = Task.TASKS.filter((task) => task.id !== idTaskToDelete);
            if (Task.TASKS.length < initialSize) {
                console.log("Task delted successfully");
            }
        } catch (error) {
            console.error("Hubo un problema al intentar eliminar la tarea. ", error);

        }


    }

    public static UpdateTask(idTaskToUpdate: number, newTask: string) {

        try {
            const taskToUpdate = Task.TASKS.find((task) => task.id === idTaskToUpdate);

            if (taskToUpdate) {
                taskToUpdate.task = newTask;
                console.log("Task updated successfully \n")
            }
            else {
                console.log("The object does not exist \n")
            }
        } catch (error) {
            console.error(error)
        }
    }

    public static UpdateStatusTask(idTaskToUpdate: number, newStatus: TaskStatus) {

        try {
            const taskToUpdate = Task.TASKS.find((task) => task.id === idTaskToUpdate)

            if (taskToUpdate) {
                taskToUpdate.status = newStatus;
                console.log("Task updated successfully")
            } else {
                console.log("El objeto no existe :C \n")
            }
        } catch (error) {
            console.error(error);
        }
    }

    public static ViewTaskByStatus(status: TaskStatus, nameStatus: string) {
        try {
            console.log(`=== Task with state: ${nameStatus} ===`);

            Task.TASKS.filter(task => task.status === status).forEach((task) => {

                console.log("ID: ", task.id);
                console.log("Task: ", task.task);
                console.log("State: ", task.status);
                console.log("");
            })
            console.log("=============================");
        } catch (error) {
            console.error(error)
        }
    }

    public static PendingTasks() {
        Task.ViewTaskByStatus(TaskStatus.PENDING, "Pending");
    }

    public static InProgressTasks() {
        Task.ViewTaskByStatus(TaskStatus.IN_PROGRESS, "In Progress")
    }

    public static DoneTasks() {
        Task.ViewTaskByStatus(TaskStatus.DONE, "Done")
    }
}

function ShowPrompt() {
    process.stdout.write("\x1b[32mtask-cli\x1b[0m ");

}


process.stdin.on("data", (data) => {
    let input = data.toString().trim();
    let [command, ...rest] = input.split(" ");

    if (command === "add") {
        let task = rest.join(" ").replace(/"/g, "");

        const newTask = new Task(
            Task.TASKS.length + 1,
            task,
            TaskStatus.PENDING
        )

        Task.AddTask(newTask);
    }

    else if (command === "list" && rest[0] === "done") { Task.DoneTasks(); }
    else if (command === "list" && rest[0] === "todo") { Task.PendingTasks(); }
    else if (command === "list" && rest[0] === "in-progress") { Task.InProgressTasks(); }

    else if (command === "list") { Task.ViewTasks(); }

    else if (command === "delete") { Task.DeleteTask(Number(rest)); }

    else if (command === "mark-in-progress") { Task.UpdateStatusTask(Number(rest), TaskStatus.IN_PROGRESS); }
    else if (command === "mark-done") { Task.UpdateStatusTask(Number(rest), TaskStatus.DONE); }
    else if (command === "mark-pending") { Task.UpdateStatusTask(Number(rest), TaskStatus.PENDING) }

    else if(command === "update"){
        const id = Number(rest[0]);
        const newTask = rest.slice(1).join(" ");
        Task.UpdateTask(id, newTask);
    }

    else if(command === "clear"){
        process.stdout.write("\x1b[2J\x1b[0;0H");
    }

    else {
        process.stdout.write("\x1b[31munrecognized command\x1b[0m ");
        console.log("")
    }
    ShowPrompt();
})

ShowPrompt();