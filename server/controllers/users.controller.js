import { getUserById } from "../models/user.model.js";

// Controlador para manejar la creación de usuarios privilegiados (Registrador)
export async function getDataUser(req, res) {
    // Extraer los datos del cuerpo de la solicitud (request body)
    const { id } = req.body;

    if (id == null) {
        return res.status(400).json(
            {
                statusCode: 400,
                error: 'id requerida'

            });
    }

    try {
        // Llamar a la función para obtener datos del usuario por id
        const exist = await getUserById(id);

        // Si el usuario no existe, responder con error
        if (!exist) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No Existe'

            });
        }

        // Enviar respuesta de éxito al cliente
        res.status(201).json({ statusCode: 201, data: exist });

    } catch (error) {
        console.error('Error al obtener datos de Usuario:', error.message);

        // Enviar respuesta de error al cliente
        res.status(500).json({ statusCode: 500, error: 'Error al obtener datos de Usuario.' });
    }
}


