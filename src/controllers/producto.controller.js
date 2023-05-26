const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getProducts = async (req, res) => {
    const response = await pool.query('SELECT p.id_producto, p.producto, p.precio, p.costo, p.sku, p.unidades, p.id_marca, m.marca, m.id_proveedor, pro.proveedor, pro.telefono, p.id_categoria, c.categoria FROM producto AS p LEFT JOIN marca AS m ON m.id_marca = p.id_marca LEFT JOIN categoria AS c ON c.id_categoria = p.id_categoria LEFT JOIN proveedor AS pro ON pro.id_proveedor = m.id_proveedor');
    res.status(200).json(response.rows);
}

const getProductByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT p.id_producto, p.producto, p.precio, p.costo, p.sku, p.unidades, p.id_marca, m.marca, m.id_proveedor, pro.proveedor, pro.telefono, p.id_categoria, c.categoria FROM producto AS p LEFT JOIN marca AS m ON m.id_marca = p.id_marca LEFT JOIN categoria AS c ON c.id_categoria = p.id_categoria LEFT JOIN proveedor AS pro ON pro.id_proveedor = m.id_proveedor WHERE p.id_producto = $1", [id]);
    res.json(response.rows);
}

const postProducts = async (req, res) =>{
    const { producto, precio, costo, sku, unidades, id_marca, id_categoria } = req.body;
    const response = await pool.query('INSERT INTO producto (producto, precio, costo, sku, unidades, id_marca, id_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7)', [producto, precio, costo, sku, unidades, id_marca, id_categoria]);
    console.log(response);
    res.json({
        message: 'Producto creado.',
        body: {
            user: {producto, precio, costo, sku, unidades, id_marca, id_categoria}
        }
    });
};

const putProduct = async (req, res) =>{
    const id = req.params.id;
    const { producto, precio, costo, sku, unidades, id_marca, id_categoria } = req.body;
    const response = await pool.query('UPDATE producto SET producto = $1, precio = $2, costo = $3, sku = $4, unidades = $5, id_marca = $6, id_categoria = $7  WHERE id_producto = $8', [producto, precio, costo, sku, unidades, id_marca, id_categoria, id]);
    console.log(response);
    res.json('El producto con el ID '+id+' ha sido actualizado.');
}

const deleteProduct = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM producto WHERE id_producto = $1', [id]);
    console.log(response);
    res.json('El producto con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getProducts,
    getProductByID,
    postProducts,
    putProduct,
    deleteProduct,
}