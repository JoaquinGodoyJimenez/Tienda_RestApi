const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getBrandsCategories = async (req, res) => {
    const response = await pool.query('SELECT mc.id_marca, m.marca, mc.id_categoria, c.categoria, p.id_proveedor, p.proveedor, p.telefono FROM marca_categoria AS MC LEFT JOIN marca AS m ON m.id_marca = mc.id_marca LEFT JOIN categoria AS c ON c.id_categoria = mc.id_categoria LEFT JOIN proveedor AS p ON p.id_proveedor = m.id_proveedor');
    res.status(200).json(response.rows);
}

const getBrandCategoryByIDS = async (req, res) => {
    const id_marca = req.params.id_marca;
    const id_categoria = req.params.id_categoria;
    const response = await pool.query("SELECT mc.id_marca, m.marca, mc.id_categoria, c.categoria, p.id_proveedor, p.proveedor, p.telefono FROM marca_categoria AS MC LEFT JOIN marca AS m ON m.id_marca = mc.id_marca LEFT JOIN categoria AS c ON c.id_categoria = mc.id_categoria LEFT JOIN proveedor AS p ON p.id_proveedor = m.id_proveedor WHERE mc.id_marca = $1 AND mc.id_categoria = $2", [id_marca, id_categoria]);
    res.json(response.rows);
}

const postBrandsCategories = async (req, res) =>{
    const { id_marca, id_categoria } = req.body;
    const response = await pool.query('INSERT INTO marca_categoria (id_marca, id_categoria) VALUES ($1, $2)', [id_marca, id_categoria]);
    console.log(response);
    res.json({
        message: 'Relación marca categoria creada.',
        body: {
            user: {id_marca, id_categoria}
        }
    });
};

const putBrandCategory = async (req, res) =>{
    const id1 = req.params.id_marca;
    const id2 = req.params.id_categoria;
    const { id_marca, id_categoria } = req.body;
    const response = await pool.query('UPDATE marca_categoria SET id_marca = $1, id_categoria = $2 WHERE id_marca = $3 AND id_categoria = $4', [id_marca, id_categoria, id1, id2]);
    console.log(response);
    res.json('La relacion marca ID '+id1+' y categoria '+id2+' ha sido actualizada.');
}

const deleteBrandCategory = async (req, res) =>{
    const id_marca = req.params.id_marca;
    const id_categoria = req.params.id_categoria;
    const response = await pool.query('DELETE FROM marca_categoria WHERE id_marca = $1 AND id_categoria = $2', [id_marca, id_categoria]);
    console.log(response);
    res.json('La relacion marca ID '+id_marca+' y categoria '+id_categoria+' ha sido eliminada.');
};

module.exports = {
    getBrandsCategories,
    getBrandCategoryByIDS,
    postBrandsCategories,
    putBrandCategory,
    deleteBrandCategory,
}