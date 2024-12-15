import { pool } from '../utils/db.js';

// Función para buscar un usuario por correo electrónico
export const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows[0];
};