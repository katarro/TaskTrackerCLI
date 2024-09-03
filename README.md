# Task CLI

`task-cli` es una aplicación de línea de comandos para gestionar tareas. Permite a los usuarios agregar, actualizar, eliminar, y listar tareas. Además, los usuarios pueden marcar tareas como en progreso o realizadas, y ver las tareas por su estado.

## Requisitos

- Node.js instalado en el sistema.
- La aplicación se ejecuta desde la línea de comandos.
- No se utilizan bibliotecas externas, solo las API nativas de Node.js.
- Almacena las tareas en un archivo JSON (este comportamiento puede ser ampliado).
- Maneja errores y casos extremos con elegancia.

## Funcionalidades

1. **Agregar Tareas**: Los usuarios pueden agregar nuevas tareas.
2. **Actualizar Tareas**: Posibilidad de actualizar la descripción de una tarea.
3. **Eliminar Tareas**: Los usuarios pueden eliminar tareas por su ID.
4. **Listar Todas las Tareas**: Lista todas las tareas almacenadas.
5. **Marcar una Tarea como en Progreso o Realizada**: Cambia el estado de una tarea específica.
6. **Listar Tareas por Estado**: Tareas pendientes, Tareas en progreso, Tareas realizadas.

## Instalación

1. Clona este repositorio en tu máquina local. `git clone <URL_DEL_REPOSITORIO>`
2. Navega al directorio del proyecto. `cd nombre_del_proyecto`
3. Asegúrate de tener Node.js instalado en tu sistema. Puedes verificar esto con: `node -v`

## Uso

Ejecuta el programa utilizando Node.js desde la línea de comandos. `node index.js`

### Comandos Disponibles

- **Agregar una tarea**: Agrega una nueva tarea con una descripción. `task-cli add "Comprar leche"`. Esto agregará una nueva tarea con la descripción especificada y la marcará como pendiente.

- **Listar todas las tareas**: Muestra todas las tareas. `task-cli list`. Este comando muestra todas las tareas, independientemente de su estado.

- **Listar tareas por estado**:
  - Pendientes: `task-cli list todo`. Muestra todas las tareas que aún no se han completado.
  - En progreso: `task-cli list in-progress`. Muestra todas las tareas que están actualmente en progreso.
  - Realizadas: `task-cli list done`. Muestra todas las tareas que han sido completadas.

- **Actualizar el estado de una tarea**:
  - Marcar una tarea como en progreso: `task-cli mark-in-progress 1`. Cambia el estado de la tarea con ID 1 a "En progreso".
  - Marcar una tarea como realizada: `task-cli mark-done 1`. Cambia el estado de la tarea con ID 1 a "Realizada".
  - Marcar una tarea como pendiente: `task-cli mark-pending 1`. Cambia el estado de la tarea con ID 1 a "Pendiente".

- **Eliminar una tarea**: Elimina una tarea especificando su ID. `task-cli delete 1`. Elimina la tarea con el ID especificado.

- **Actualizar la descripción de una tarea**: Actualiza la descripción de una tarea específica. `task-cli update 1 "Ir al supermercado"`. Actualiza la tarea con ID 1 con la nueva descripción proporcionada.

- **Limpiar la pantalla**: Limpia la pantalla de la consola. `task-cli clear`. Borra todo el contenido actual de la consola.

- **Salir del programa**: Puedes salir del programa usando `Ctrl+C` en cualquier momento.

### Ejemplos

1. **Agregar una tarea**: `task-cli add "Leer un libro"`. Salida esperada: `Tarea añadida: Leer un libro`.

2. **Listar tareas pendientes**: `task-cli list todo`. Salida esperada: `=== Tareas con estado: Pendiente === ID: 1 Task: Leer un libro Estado: PENDING`.

3. **Marcar una tarea como realizada**: `task-cli mark-done 1`. Salida esperada: `Task updated successfully`.

4. **Eliminar una tarea**: `task-cli delete 1`. Salida esperada: `Task deleted successfully`.

## Manejo de Errores

El programa maneja errores comunes, como intentar actualizar o eliminar una tarea que no existe, mostrando mensajes claros en la consola. También utiliza bloques `try-catch` para capturar y manejar excepciones inesperadas.

## Contribuciones

Las contribuciones son bienvenidas. Puedes forkear el repositorio y enviar un pull request con tus mejoras.

## Licencia

Este proyecto está bajo la licencia MIT.