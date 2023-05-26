const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getRoles = async (req, res) => {
    const response = await pool.query('SELECT * FROM rol');
    res.status(200).json(response.rows);
}

const getRolByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM rol WHERE id_rol = $1", [id]);
    res.json(response.rows);
}

const postRoles = async (req, res) =>{
    const { rol } = req.body;
    const response = await pool.query('INSERT INTO rol (rol) VALUES ($1)', [rol]);
    console.log(response);
    res.json({
        message: 'Rol creado.',
        body: {
            user: {rol}
        }
    });
};

const putRol = async (req, res) =>{
    const id = req.params.id;
    const { rol } = req.body;
    const response = await pool.query('UPDATE rol SET rol = $1 WHERE id_rol = $2', [rol, id]);
    console.log(response);
    res.json('El rol con el ID '+id+' ha sido actualizado.');
}

const deleteRol = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM rol WHERE id_rol = $1', [id]);
    console.log(response);
    res.json('El rol con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getRoles,
    getRolByID,
    postRoles,
    putRol,
    deleteRol,
}