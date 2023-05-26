const { Pool } = require('pg');

const pool = new  Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Pikmin45',
    database: 'tienda',
    port: '5432',
})

const getCategories = async (req, res) => {
    const response = await pool.query('SELECT * FROM categoria');
    res.status(200).json(response.rows);
}

const getCategoryByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM categoria WHERE id_categoria = $1", [id]);
    res.json(response.rows);
}

const postCategories = async (req, res) =>{
    const { categoria } = req.body;
    const response = await pool.query('INSERT INTO categoria (categoria) VALUES ($1)', [categoria]);
    console.log(response);
    res.json({
        message: 'Categoria creada.',
        body: {
            user: {categoria}
        }
    });
};

const putCategory = async (req, res) =>{
    const id = req.params.id;
    const { categoria } = req.body;
    const response = await pool.query('UPDATE categoria SET categoria = $1 WHERE id_categoria = $2', [categoria, id]);
    console.log(response);
    res.json('La categoria con el ID '+id+' ha sido actualizada.');
}

const deleteCategory = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM categoria WHERE id_categoria = $1', [id]);
    console.log(response);
    res.json('La categoria con el ID '+id+' ha sido eliminado.');
};

module.exports = {
    getCategories,
    getCategoryByID,
    postCategories,
    putCategory,
    deleteCategory,
}