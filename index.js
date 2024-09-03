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
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["PENDING"] = 0] = "PENDING";
    TaskStatus[TaskStatus["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    TaskStatus[TaskStatus["DONE"] = 2] = "DONE";
})(TaskStatus || (TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task(id, task, status) {
        this.id = id;
        this.task = task;
        this.status = status;
    }
    Task.AddTask = function (task) {
        try {
            Task.TASKS.push(task);
            console.log("Task added successfully (ID: ".concat(task.id, ")"));
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.ViewTasks = function () {
        try {
            console.log("=============================");
            if (Task.TASKS.length === 0) {
                console.log("There are no tasks yet");
            }
            Task.TASKS.forEach(function (task) {
                console.log("Objeto numero: ", task.id);
                console.log("Tarea: ", task.task);
                console.log("Estado: ", task.status);
                console.log("");
            });
            console.log("=============================");
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.DeleteTask = function (idTaskToDelete) {
        try {
            var initialSize = Task.TASKS.length;
            Task.TASKS = Task.TASKS.filter(function (task) { return task.id !== idTaskToDelete; });
            if (Task.TASKS.length < initialSize) {
                console.log("Task delted successfully");
            }
        }
        catch (error) {
            console.error("Hubo un problema al intentar eliminar la tarea. ", error);
        }
    };
    Task.UpdateTask = function (idTaskToUpdate, newTask) {
        try {
            var taskToUpdate = Task.TASKS.find(function (task) { return task.id === idTaskToUpdate; });
            if (taskToUpdate) {
                taskToUpdate.task = newTask;
                console.log("Task updated successfully \n");
            }
            else {
                console.log("The object does not exist \n");
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.UpdateStatusTask = function (idTaskToUpdate, newStatus) {
        try {
            var taskToUpdate = Task.TASKS.find(function (task) { return task.id === idTaskToUpdate; });
            if (taskToUpdate) {
                taskToUpdate.status = newStatus;
                console.log("Task updated successfully");
            }
            else {
                console.log("El objeto no existe :C \n");
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.ViewTaskByStatus = function (status, nameStatus) {
        try {
            console.log("=== Task with state: ".concat(nameStatus, " ==="));
            Task.TASKS.filter(function (task) { return task.status === status; }).forEach(function (task) {
                console.log("ID: ", task.id);
                console.log("Task: ", task.task);
                console.log("State: ", task.status);
                console.log("");
            });
            console.log("=============================");
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.PendingTasks = function () {
        Task.ViewTaskByStatus(TaskStatus.PENDING, "Pending");
    };
    Task.InProgressTasks = function () {
        Task.ViewTaskByStatus(TaskStatus.IN_PROGRESS, "In Progress");
    };
    Task.DoneTasks = function () {
        Task.ViewTaskByStatus(TaskStatus.DONE, "Done");
    };
    Task.TASKS = [];
    return Task;
}());
function ShowPrompt() {
    process.stdout.write("\x1b[32mtask-cli\x1b[0m ");
}
process.stdin.on("data", function (data) {
    var input = data.toString().trim();
    var _a = input.split(" "), command = _a[0], rest = _a.slice(1);
    if (command === "add") {
        var task = rest.join(" ").replace(/"/g, "");
        var newTask = new Task(Task.TASKS.length + 1, task, TaskStatus.PENDING);
        Task.AddTask(newTask);
    }
    else if (command === "list" && rest[0] === "done") {
        Task.DoneTasks();
    }
    else if (command === "list" && rest[0] === "todo") {
        Task.PendingTasks();
    }
    else if (command === "list" && rest[0] === "in-progress") {
        Task.InProgressTasks();
    }
    else if (command === "list") {
        Task.ViewTasks();
    }
    else if (command === "delete") {
        Task.DeleteTask(Number(rest));
    }
    else if (command === "mark-in-progress") {
        Task.UpdateStatusTask(Number(rest), TaskStatus.IN_PROGRESS);
    }
    else if (command === "mark-done") {
        Task.UpdateStatusTask(Number(rest), TaskStatus.DONE);
    }
    else if (command === "mark-pending") {
        Task.UpdateStatusTask(Number(rest), TaskStatus.PENDING);
    }
    else if (command === "update") {
        var id = Number(rest[0]);
        var newTask = rest.slice(1).join(" ");
        Task.UpdateTask(id, newTask);
    }
    else if (command === "clear") {
        process.stdout.write("\x1b[2J\x1b[0;0H");
    }
    else {
        process.stdout.write("\x1b[31munrecognized command\x1b[0m ");
        console.log("");
    }
    ShowPrompt();
});
ShowPrompt();
