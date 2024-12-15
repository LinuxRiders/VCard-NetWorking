import { Router } from 'express';
import usuarios from './usuario.routes.js'

const router = Router();

router.use('/user', usuarios);

router.get('/ping', (req, res) => {
    res.send("Conexion Funcional");
})

export default router;