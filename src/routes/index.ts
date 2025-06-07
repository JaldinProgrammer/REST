import { Router } from 'express';
import healthRoutes from './health.routes';
import codeOnDemandRoutes from './code-on-demand.routes';
import userRoutes from './v1/user.routes';
import postRoutes from './v1/post.routes';
import userRoutesVersionDos from './version2/User.routes'; // not folllowing best practices for naming

const router = Router();

router.use('/health', healthRoutes);
router.use('/code-on-demand', codeOnDemandRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);
router.use('/version2/usuarios', userRoutesVersionDos); // use other language

export default router; 