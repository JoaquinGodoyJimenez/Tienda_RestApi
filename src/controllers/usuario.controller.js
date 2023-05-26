const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuario');
    res.status(200).json(response.rows);
}

const getUserByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM usuario WHERE id_usuario = $1", [id]);
    res.json(response.rows);
}

const postUsers = async (req, res) =>{
    const { correo, contrasena, usuario, nombre, direccion, telefono } = req.body;
    const response = await pool.query('INSERT INTO usuario (correo, contrasena, usuario, nombre, direccion, telefono) VALUES ($1, md5($2), $3, $4, $5, $6)', [correo, contrasena, usuario, nombre, direccion, telefono]);
    console.log(response);
    res.json({
        message: 'Usuario creado.',
        body: {
            user: {correo, usuario, nombre, direccion, telefono}
        }
    });
};

const putUser = async (req, res) =>{
    const id = req.params.id;
    const { correo, usuario, nombre, direccion, telefono } = req.body;
    const response = await pool.query('UPDATE usuario SET correo = $1, usuario = $2, nombre = $3, direccion = $4, telefono = $5 WHERE id_usuario = $6', [correo, usuario, nombre, direccion, telefono, id]);
    console.log(response);
    res.json('El usuario con el ID '+id+' ha sido actualizado.');
}

const deleteUser = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);
    console.log(response);
    res.json('El usuario con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getUsers,
    getUserByID,
    postUsers,
    putUser,
    deleteUser,
}