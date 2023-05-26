const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
});

const getPrivileges = async (req, res) => {
    const response = await pool.query('SELECT * FROM privilegio');
    res.status(200).json(response.rows);
};

const getPrivilegeByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM privilegio WHERE id_privilegio = $1', [id]);
    res.json(response.rows);
};

const postPrivileges = async (req, res) => {
    const { privilegio } = req.body;
    const response = await pool.query('INSERT INTO privilegio (privilegio) VALUES ($1)', [privilegio]);
    console.log(response);
    res.json({
        message: 'Privilegio creado.',
        body: {
            privilegio,
        },
    });
};

const putPrivilege = async (req, res) => {
    const id = req.params.id;
    const { privilegio } = req.body;
    const response = await pool.query('UPDATE privilegio SET privilegio = $1 WHERE id_privilegio = $2', [privilegio, id]);
    console.log(response);
    res.json('El privilegio con el ID ' + id + ' ha sido actualizado.');
};

const deletePrivilege = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM privilegio WHERE id_privilegio = $1', [id]);
    console.log(response);
    res.json('El privilegio con el ID ' + id + ' ha sido eliminado.');
};

module.exports = {
    getPrivileges,
    getPrivilegeByID,
    postPrivileges,
    putPrivilege,
    deletePrivilege,
};
