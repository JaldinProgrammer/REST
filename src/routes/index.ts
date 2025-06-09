import { Router } from 'express';
import healthRoutes from './health.routes';
import codeOnDemandRoutes from './code-on-demand.routes';
import userRoutes from './v1/user.routes';
import postRoutes from './v1/post.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/code-on-demand', codeOnDemandRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);
// simple Bad practices, about names and routes
router.use('/v1/listposts', postRoutes);
router.use('/v1/post', postRoutes);
// mucahs malas practicas, devovler errores que no coinciden, devlover datos de debug devovler datos comprometedores de una tabla, etc etc
router.use('/v1/user', userRoutes);


export default router;