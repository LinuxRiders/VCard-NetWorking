import { Router } from 'express';



const router = Router();


router.get('/ping', (req, res) => {
    res.send("Conexion Funcional");
})

export default router;