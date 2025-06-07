import { Router } from 'express';
import healthRoutes from './health.routes';
import codeOnDemandRoutes from './code-on-demand.routes';
import userRoutes from './v1/user.routes';
import userPostRoute from './version2/UserPost_route'; // poorly named (not following snake_case or kebab-case)


const router = Router();

router.use('/health', healthRoutes);
router.use('/code-on-demand', codeOnDemandRoutes);
router.use('/v1/users', userRoutes);
router.use('/version2/usuarios-post', userPostRoute); // mixes languages, unclear intent

export default router; 