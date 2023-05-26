const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getShops = async (req, res) => {
    const response = await pool.query('SELECT * FROM tienda');
    res.status(200).json(response.rows);
}

const getShopByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM tienda WHERE id_tienda = $1", [id]);
    res.json(response.rows);
}

const postShops = async (req, res) =>{
    const { tienda, direccion } = req.body;
    const response = await pool.query('INSERT INTO tienda (tienda, direccion) VALUES ($1, $2)', [tienda, direccion]);
    console.log(response);
    res.json({
        message: 'Tienda creada.',
        body: {
            user: {tienda, direccion}
        }
    });
};

const putShop = async (req, res) =>{
    const id = req.params.id;
    const { tienda, direccion } = req.body;
    const response = await pool.query('UPDATE tienda SET tienda = $1, direccion = $2 WHERE id_tienda = $3', [tienda, direccion, id]);
    console.log(response);
    res.json('La Tienda con el ID '+id+' ha sido actualizada.');
}

const deleteShop = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM tienda WHERE id_tienda = $1', [id]);
    console.log(response);
    res.json('La tienda con el ID '+id+' ha sido eliminada.');
};

module.exports = {
    getShops,
    getShopByID,
    postShops,
    putShop,
    deleteShop,
}