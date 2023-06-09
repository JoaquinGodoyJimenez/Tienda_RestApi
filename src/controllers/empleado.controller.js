const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getEmployees = async (req, res) => {
    const response = await pool.query('SELECT e.id_empleado, e.empleado, e.id_tienda, t.tienda FROM empleado AS e LEFT JOIN tienda AS t ON t.id_tienda = e.id_tienda');
    res.status(200).json(response.rows);
}

const getEmployeeByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT e.id_empleado, e.empleado, e.id_tienda, t.tienda FROM empleado AS e LEFT JOIN tienda AS t ON t.id_tienda = e.id_tienda WHERE id_empleado = $1", [id]);
    res.json(response.rows);
}

const postEmployees = async (req, res) =>{
    const { empleado, direccion, telefono, id_tienda } = req.body;
    const response = await pool.query('INSERT INTO empleado (empleado, id_tienda) VALUES ($1, $2)', [empleado, id_tienda]);
    console.log(response);
    res.json({
        message: 'Empleado creado.',
        body: {
            user: {empleado}
        }
    });
};

const putEmployee = async (req, res) =>{
    const id = req.params.id;
    const { empleado, id_tienda } = req.body;
    const response = await pool.query('UPDATE empleado SET empleado = $1, id_tienda= $2 WHERE id_empleado = $3', [empleado, id_tienda, id]);
    console.log(response);
    res.json('El empleado con el ID '+id+' ha sido actualizado.');
}

const deleteEmployee = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
    console.log(response);
    res.json('El empleado con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getEmployees,
    getEmployeeByID,
    postEmployees,
    putEmployee,
    deleteEmployee,
}