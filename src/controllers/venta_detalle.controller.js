const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
});

const getSaleDetails = async (req, res) => {
    const response = await pool.query('SELECT vd.id_venta, vd.id_producto, v.fecha, v.id_usuario, u.nombre, v.fecha, v.id_tienda, t.tienda, t.direccion, p.producto, p.sku, vd.precio_unitario, vd.cantidad FROM venta_detalle AS vd LEFT JOIN venta AS v on v.id_venta = vd.id_venta LEFT JOIN producto AS p ON p.id_producto = vd.id_producto LEFT JOIN usuario AS u ON u.id_usuario = v.id_venta LEFT JOIN tienda AS t ON t.id_tienda = v.id_tienda');
    res.status(200).json(response.rows);
};

const getSaleDetailByID = async (req, res) => {
    const id_venta = req.params.id_venta;
    const id_producto = req.params.id_producto;
    const response = await pool.query('SELECT vd.id_venta, vd.id_producto, v.fecha, v.id_usuario, u.nombre, v.fecha, v.id_tienda, t.tienda, t.direccion, p.producto, p.sku, vd.precio_unitario, vd.cantidad FROM venta_detalle AS vd LEFT JOIN venta AS v on v.id_venta = vd.id_venta LEFT JOIN producto AS p ON p.id_producto = vd.id_producto LEFT JOIN usuario AS u ON u.id_usuario = v.id_venta LEFT JOIN tienda AS t ON t.id_tienda = v.id_tienda WHERE vd.id_venta = $1 AND vd.id_producto = $2', [id_venta, id_producto]);
    res.json(response.rows);
};

const postSaleDetail = async (req, res) => {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    const response = await pool.query('INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)', [id_venta, id_producto, cantidad, precio_unitario]);
    console.log(response);
    res.json({
        message: 'Detalle de venta creado.',
        body: {
            saleDetail: { id_venta, id_producto, cantidad, precio_unitario }
        }
    });
};

const putSaleDetail = async (req, res) => {
    const idv = req.params.id_venta;
    const idp = req.params.id_producto;
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    const response = await pool.query('UPDATE venta_detalle SET id_venta = $1, id_producto = $2, cantidad = $3, precio_unitario = $4 WHERE id_venta = $5 AND id_producto = $6', [id_venta, id_producto, cantidad, precio_unitario , idv, idp]);
    console.log(response);
    res.json('El detalle de venta con ID de venta ' + idv + ' y ID de producto ' + idp + ' ha sido actualizado.');
};

const deleteSaleDetail = async (req, res) => {
    const id_venta = req.params.id_venta;
    const id_producto = req.params.id_producto;
    const response = await pool.query('DELETE FROM venta_detalle WHERE id_venta = $1 AND id_producto = $2', [id_venta, id_producto]);
    console.log(response);
    res.json('El detalle de venta con ID de venta ' + id_venta + ' y ID de producto ' + id_producto + ' ha sido eliminado.');
};

module.exports = {
    getSaleDetails,
    getSaleDetailByID,
    postSaleDetail,
    putSaleDetail,
    deleteSaleDetail,
};
