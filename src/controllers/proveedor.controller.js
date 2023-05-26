const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getProviders = async (req, res) => {
    const response = await pool.query('SELECT * FROM proveedor');
    res.status(200).json(response.rows);
}

const getProviderByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM proveedor WHERE id_proveedor = $1", [id]);
    res.json(response.rows);
}

const postProviders = async (req, res) =>{
    const { proveedor, telefono } = req.body;
    const response = await pool.query('INSERT INTO proveedor (proveedor, telefono) VALUES ($1, $2)', [proveedor, telefono]);
    console.log(response);
    res.json({
        message: 'Proveedor creado.',
        body: {
            user: {proveedor, telefono}
        }
    });
};

const putProvider = async (req, res) =>{
    const id = req.params.id;
    const { proveedor, telefono } = req.body;
    const response = await pool.query('UPDATE proveedor SET proveedor = $1, telefono = $2 WHERE id_proveedor = $3', [proveedor, telefono, id]);
    console.log(response);
    res.json('El proveedor con el ID '+id+' ha sido actualizado.');
}

const deleteProvider = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM proveedor WHERE id_proveedor = $1', [id]);
    console.log(response);
    res.json('El proveedor con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getProviders,
    getProviderByID,
    postProviders,
    putProvider,
    deleteProvider,
}