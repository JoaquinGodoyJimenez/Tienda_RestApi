const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getPayments = async (req, res) => {
    const response = await pool.query('SELECT p.id_pago, p.fecha, p.monto, p.id_venta, v.id_usuario, u.usuario, v.id_tienda, t.tienda, t.direccion, v.id_empleado, e.empleado FROM pago AS p LEFT JOIN venta AS v ON v.id_venta = p.id_venta LEFT JOIN usuario AS u ON v.id_usuario = u.id_usuario LEFT JOIN tienda AS t ON t.id_tienda = v.id_tienda LEFT JOIN empleado AS e ON e.id_empleado = v.id_empleado');
    res.status(200).json(response.rows);
}

const getPaymentByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT p.id_pago, p.fecha, p.monto, p.id_venta, v.id_usuario, u.usuario, v.id_tienda, t.tienda, t.direccion, v.id_empleado, e.empleado FROM pago AS p LEFT JOIN venta AS v ON v.id_venta = p.id_venta LEFT JOIN usuario AS u ON v.id_usuario = u.id_usuario LEFT JOIN tienda AS t ON t.id_tienda = v.id_tienda LEFT JOIN empleado AS e ON e.id_empleado = v.id_empleado WHERE p.id_pago = $1", [id]);
    res.json(response.rows);
}

const postPayments = async (req, res) =>{
    const { fecha, monto, id_venta } = req.body;
    const response = await pool.query('INSERT INTO pago (fecha, monto, id_venta) VALUES ($1, $2, $3)', [fecha, monto, id_venta]);
    console.log(response);
    res.json({
        message: 'Pago creado.',
        body: {
            user: {fecha, monto, id_venta}
        }
    });
};

const putPayment = async (req, res) =>{
    const id = req.params.id;
    const { fecha, monto, id_venta } = req.body;
    const response = await pool.query('UPDATE pago SET fecha = $1, monto = $2, id_venta = $3 WHERE id_pago = $4', [fecha, monto, id_venta, id]);
    console.log(response);
    res.json('El pago con el ID '+id+' ha sido actualizado.');
}

const deletePayment = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM pago WHERE id_pago = $1', [id]);
    console.log(response);
    res.json('El pago con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getPayments,
    getPaymentByID,
    postPayments,
    putPayment,
    deletePayment,
}