const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getBrands = async (req, res) => {
    const response = await pool.query('SELECT * FROM marca AS m LEFT JOIN proveedor AS p ON m.id_proveedor = p.id_proveedor');
    res.status(200).json(response.rows);
}

const getBrandByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM marca AS m LEFT JOIN proveedor AS p ON m.id_proveedor = p.id_proveedor WHERE id_marca = $1", [id]);
    res.json(response.rows);
}

const postBrands = async (req, res) =>{
    const { marca, id_proveedor } = req.body;
    const response = await pool.query('INSERT INTO marca (marca, id_proveedor) VALUES ($1, $2)', [marca, id_proveedor]);
    console.log(response);
    res.json({
        message: 'Marca creada.',
        body: {
            user: {marca, id_proveedor}
        }
    });
};

const putBrand = async (req, res) =>{
    const id = req.params.id;
    const { marca, id_proveedor } = req.body;
    const response = await pool.query('UPDATE marca SET marca = $1, id_proveedor = $2 WHERE id_marca = $3', [marca, id_proveedor, id]);
    console.log(response);
    res.json('La marca con el ID '+id+' ha sido actualizada.');
}

const deleteBrand = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM marca WHERE id_marca = $1', [id]);
    console.log(response);
    res.json('La marca con el ID '+id+' ha sido eliminada.');
};

module.exports = {
    getBrands,
    getBrandByID,
    postBrands,
    putBrand,
    deleteBrand,
}