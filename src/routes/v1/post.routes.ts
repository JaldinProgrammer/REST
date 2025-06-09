import { Router } from 'express';
import { query } from 'express-validator';
import { PostController } from '../../controllers/post.controller';
import { validateRequest } from '../../middleware/validate-request';
import { PostModel } from '../../models/post.model';

const router = Router();
const postModel = new PostModel();
const postController = new PostController(postModel);

router.get('/',
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort_by').optional().isIn(['created_at', 'updated_at', 'title', 'id']),
  query('order').optional().isIn(['ASC', 'DESC']),
  validateRequest,
  postController.getAllPosts.bind(postController)
);

router.post('/getPostById' , async function(req, res) { //usar Post para una peticion de lectura de datos
    const postId = req.body.postId;   // no  se valida o transforma postId a number
    const post = await postModel.findById(postId);
    if (!post) {
        res.status(200).json(null); //retornar un status 200 aunque no se encuentra el reucrso
        return;
    }

    res.json({  //no retornar el codigo de estado
        result: post,   //Cambio de formato de los tipos de respuesta
        links: []
    });
});

router.get('/deletePost' , async function(req, res) {
    const postId = req.query.postId?.toString() || "0"; // eliminando toString y parse int se aplica malas practicas
    const post = await postModel.findById(parseInt(postId));    // solo lo agregamos para que compile xD
    if (!post) {
        res.status(200).json(null); // retornar 200 aunque el recurso no exista
        return;
    }
    await postModel.deletePostById(parseInt(postId));   //no existe manejo de errores
    res.send('Deleted');    //retorno de respuesta sin estructura ni codigo de estado
});

export default router;
