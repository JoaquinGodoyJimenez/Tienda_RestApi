const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
});

const getUserRoles = async (req, res) => {
    const response = await pool.query(
        'SELECT ur.id_usuario, ur.id_rol, u.usuario, r.rol FROM usuario_rol AS ur LEFT JOIN usuario AS u ON ur.id_usuario = u.id_usuario LEFT JOIN rol AS r ON r.id_rol = ur.id_rol'
    );
    res.status(200).json(response.rows);
};

const getUserRoleByIDS = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    const id_rol = req.params.id_rol;
    const response = await pool.query(
        'SELECT ur.id_usuario, ur.id_rol, u.usuario, r.rol FROM usuario_rol AS ur LEFT JOIN usuario AS u ON ur.id_usuario = u.id_usuario LEFT JOIN rol AS r ON r.id_rol = ur.id_rol WHERE ur.id_usuario = $1 AND ur.id_rol = $2',
        [id_usuario, id_rol]
    );
    res.json(response.rows);
};

const postUserRoles = async (req, res) => {
    const { id_usuario, id_rol } = req.body;
    const response = await pool.query(
        'INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ($1, $2)',
        [id_usuario, id_rol]
    );
    console.log(response);
    res.json({
        message: 'Relación usuario rol creada.',
        body: {
            userRole: { id_usuario, id_rol },
        },
    });
};

const putUserRole = async (req, res) => {
    const id1 = req.params.id_usuario;
    const id2 = req.params.id_rol;
    const { id_usuario, id_rol } = req.body;
    const response = await pool.query(
        'UPDATE usuario_rol SET id_usuario = $1, id_rol = $2 WHERE id_usuario = $3 AND id_rol = $4',
        [id_usuario, id_rol, id1, id2]
    );
    console.log(response);
    res.json(
        `La relación usuario ID ${id1} y rol ID ${id2} ha sido actualizada.`
    );
};

const deleteUserRole = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    const id_rol = req.params.id_rol;
    const response = await pool.query(
        'DELETE FROM usuario_rol WHERE id_usuario = $1 AND id_rol = $2',
        [id_usuario, id_rol]
    );
    console.log(response);
    res.json(
        `La relación usuario ID ${id_usuario} y rol ID ${id_rol} ha sido eliminada.`
    );
};

module.exports = {
    getUserRoles,
    getUserRoleByIDS,
    postUserRoles,
    putUserRole,
    deleteUserRole,
};
