const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
});

const getRolePrivileges = async (req, res) => {
    const response = await pool.query(
        'SELECT rp.id_rol, rp.id_privilegio, r.rol, p.privilegio FROM rol_privilegio AS rp LEFT JOIN rol AS r ON rp.id_rol = r.id_rol LEFT JOIN privilegio AS p ON rp.id_privilegio = p.id_privilegio'
    );
    res.status(200).json(response.rows);
};

const getRolePrivilegeByIDs = async (req, res) => {
    const id_rol = req.params.id_rol;
    const id_privilegio = req.params.id_privilegio;
    const response = await pool.query(
        'SELECT rp.id_rol, rp.id_privilegio, r.rol, p.privilegio FROM rol_privilegio AS rp LEFT JOIN rol AS r ON rp.id_rol = r.id_rol LEFT JOIN privilegio AS p ON rp.id_privilegio = p.id_privilegio WHERE rp.id_rol = $1 AND rp.id_privilegio = $2',
        [id_rol, id_privilegio]
    );
    res.json(response.rows);
};

const postRolePrivilege = async (req, res) => {
    const { id_rol, id_privilegio } = req.body;
    const response = await pool.query(
        'INSERT INTO rol_privilegio (id_rol, id_privilegio) VALUES ($1, $2)',
        [id_rol, id_privilegio]
    );
    console.log(response);
    res.json({
        message: 'Relación rol privilegio creada.',
        body: {
            rolPrivilegio: { id_rol, id_privilegio },
        },
    });
};

const putRolePrivilege = async (req, res) => {
    const id1 = req.params.id_rol;
    const id2 = req.params.id_privilegio;
    const { id_rol, id_privilegio } = req.body;
    const response = await pool.query(
        'UPDATE rol_privilegio SET id_rol = $1, id_privilegio = $2 WHERE id_rol = $3 AND id_privilegio = $4',
        [id_rol, id_privilegio, id1, id2]
    );
    console.log(response);
    res.json(
        `La relación rol ID ${id1} y privilegio ID ${id2} ha sido actualizada.`
    );
};

const deleteRolePrivilege = async (req, res) => {
    const id_rol = req.params.id_rol;
    const id_privilegio = req.params.id_privilegio;
    const response = await pool.query(
        'DELETE FROM rol_privilegio WHERE id_rol = $1 AND id_privilegio = $2',
        [id_rol, id_privilegio]
    );
    console.log(response);
    res.json(
        `La relación rol ID ${id_rol} y privilegio ID ${id_privilegio} ha sido eliminada.`
    );
};

module.exports = {
    getRolePrivileges,
    getRolePrivilegeByIDs,
    postRolePrivilege,
    putRolePrivilege,
    deleteRolePrivilege,
};
