import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    port: 3306,
    database: 'gestion_proyectos'
});

db.connect(error => {
    if (error) {
        console.log("Error al establecer la conexión");
        return;
    }
    console.log("Conexión exitosa");
});

app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000");
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de Gestión de Proyectos");
});

//crud para proyectos
// Obtener todos los proyectos
app.get("/proyectos", (req, res) => {
    const query = "SELECT * FROM proyectos";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

// Crear un nuevo proyecto
app.post("/proyectos", (req, res) => {
    const { nombre } = req.body;
    const query = "INSERT INTO proyectos(nombre) VALUES(?)";
    db.query(query, [nombre], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar el proyecto');
            return;
        }
        res.status(200).json(`Proyecto registrado con el ID: ${results.insertId}`);
    });
});

// Actualizar un proyecto
app.put("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE proyectos SET nombre = ? WHERE id = ?";

    db.query(query, [nombre, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar el proyecto');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Proyecto no encontrado');
            return;
        }
        res.status(200).json(`Proyecto con ID: ${id} actualizado correctamente`);
    });
});

// Eliminar un proyecto
app.delete("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM proyectos WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar el proyecto');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Proyecto no encontrado');
            return;
        }
        res.status(200).json(`Proyecto con ID: ${id} eliminado correctamente`);
    });
});

//crud para empleados
// Obtener todos los empleados
app.get("/empleados", (req, res) => {
    const query = "SELECT * FROM empleados";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

// Crear un nuevo empleado
app.post("/empleados", (req, res) => {
    const { nombre, cargo } = req.body;
    const query = "INSERT INTO empleados(nombre, cargo) VALUES(?, ?)";
    db.query(query, [nombre, cargo], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar el empleado');
            return;
        }
        res.status(200).json(`Empleado registrado con el ID: ${results.insertId}`);
    });
});

// Actualizar un empleado
app.put("/empleados/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, cargo } = req.body;
    const query = "UPDATE empleados SET nombre = ?, cargo = ? WHERE id = ?";

    db.query(query, [nombre, cargo, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar el empleado');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Empleado no encontrado');
            return;
        }
        res.status(200).json(`Empleado con ID: ${id} actualizado correctamente`);
    });
});

// Eliminar un empleado
app.delete("/empleados/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM empleados WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar el empleado');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Empleado no encontrado');
            return;
        }
        res.status(200).json(`Empleado con ID: ${id} eliminado correctamente`);
    });
});
//crud para tareas
// Obtener todas las tareas
// Obtener todas las tareas
app.get("/tareas", (req, res) => {
    const query = `SELECT t.*, p.nombre as proyecto, GROUP_CONCAT(e.nombre SEPARATOR ', ') as empleados
                   FROM tareas t
                   LEFT JOIN proyectos p ON t.proyecto_id = p.id
                   LEFT JOIN tarea_empleado te ON t.id = te.tarea_id
                   LEFT JOIN empleados e ON te.empleado_id = e.id
                   GROUP BY t.id`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

// Crear una nueva tarea
app.post("/tareas", (req, res) => {
    const { descripcion, proyecto_id, estado, empleados } = req.body;
    const query = "INSERT INTO tareas(descripcion, proyecto_id, estado) VALUES(?, ?, ?)";
    
    db.query(query, [descripcion, proyecto_id, estado], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar la tarea');
            return;
        }

        const tareaId = results.insertId;
        const employeeQueries = empleados.map(empId => {
            return db.promise().query("INSERT INTO tarea_empleado(tarea_id, empleado_id) VALUES(?, ?)", [tareaId, empId]);
        });

        Promise.all(employeeQueries)
            .then(() => res.status(200).json(`Tarea registrada con el ID: ${tareaId}`))
            .catch(err => res.status(500).json('Error al asignar empleados a la tarea'));
    });
});

// Actualizar una tarea
app.put("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const { descripcion, proyecto_id, estado, empleados } = req.body;
    const query = "UPDATE tareas SET descripcion = ?, proyecto_id = ?, estado = ? WHERE id = ?";

    db.query(query, [descripcion, proyecto_id, estado, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar la tarea');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Tarea no encontrada');
            return;
        }

        // Actualizar empleados asignados a la tarea
        db.query("DELETE FROM tarea_empleado WHERE tarea_id = ?", [id], (error) => {
            if (error) {
                res.status(500).json('Error al actualizar empleados de la tarea');
                return;
            }

            const employeeQueries = empleados.map(empId => {
                return db.promise().query("INSERT INTO tarea_empleado(tarea_id, empleado_id) VALUES(?, ?)", [id, empId]);
            });

            Promise.all(employeeQueries)
                .then(() => res.status(200).json(`Tarea con ID: ${id} actualizada correctamente`))
                .catch(err => res.status(500).json('Error al asignar empleados a la tarea'));
        });
    });
});

// Eliminar una tarea
app.delete("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM tareas WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar la tarea');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Tarea no encontrada');
            return;
        }

        db.query("DELETE FROM tarea_empleado WHERE tarea_id = ?", [id], (error) => {
            if (error) {
                res.status(500).json('Error al eliminar las asignaciones de la tarea');
                return;
            }
            res.status(200).json(`Tarea con ID: ${id} eliminada correctamente`);
        });
    });
});

app.get("/tareas/:id/empleados", (req, res) => {
    const { id } = req.params;
    const query = `SELECT e.* FROM empleados e
                   JOIN tarea_empleado te ON e.id = te.empleado_id
                   WHERE te.tarea_id = ?`;

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al recibir datos de empleados');
            return;
        }
        res.status(200).json(results);
    });
});