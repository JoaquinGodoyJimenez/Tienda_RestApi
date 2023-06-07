const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getSales = async (req, res) => {
    const response = await pool.query('SELECT v.id_venta, v.fecha, u.id_usuario, u.usuario, t.id_tienda, t.tienda, e.id_empleado, e.empleado FROM venta AS v LEFT JOIN usuario AS u ON u.id_usuario = v.id_usuario LEFT JOIN tienda AS t ON t.id_tienda = v.id_tienda LEFT JOIN empleado AS e ON e.id_empleado = v.id_empleado');
    res.status(200).json(response.rows);
}

const getSaleByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT v.id_venta, v.fecha, u.id_usuario, u.usuario, t.id_tienda, t.tienda, e.id_empleado, e.empleado FROM venta AS v LEFT JOIN usuario AS u ON u.id_usuario = v.id_usuario LEFT JOIN tienda AS t ON t.id_tienda = v.id_tienda LEFT JOIN empleado AS e ON e.id_empleado = v.id_empleado WHERE v.id_venta = $1", [id]);
    res.json(response.rows);
}

const postSales = async (req, res) =>{
    const { fecha, id_usuario, id_tienda, id_empleado } = req.body;
    const response = await pool.query('INSERT INTO venta (fecha, id_usuario, id_tienda, id_empleado) VALUES ($1, $2, $3, $4)', [fecha, id_usuario, id_tienda, id_empleado]);
    console.log(response);
    res.json({
        message: 'Venta creada.',
        body: {
            user: {fecha, id_usuario, id_tienda, id_empleado}
        }
    });
};

const putSale = async (req, res) =>{
    const id = req.params.id;
    const { fecha, id_usuario, id_tienda, id_empleado } = req.body;
    const response = await pool.query('UPDATE venta SET fecha = $1, id_usuario = $2, id_tienda = $3, id_empleado= $4 WHERE id_venta = $5', [fecha, id_usuario, id_tienda, id_empleado, id]);
    console.log(response);
    res.json('La venta con el ID '+id+' ha sido actualizada.');
}

const deleteSale = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM venta WHERE id_venta = $1', [id]);
    console.log(response);
    res.json('La venta con el ID '+id+' ha sido eliminada.');
};

module.exports = {
    getSales,
    getSaleByID,
    postSales,
    putSale,
    deleteSale,
}