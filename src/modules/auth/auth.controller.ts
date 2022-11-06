import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', (req, res) => {
    res.send('auth index');
})

export default authRouter;