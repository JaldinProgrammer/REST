
import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { StatusCodes } from 'http-status-codes';
import db from '../config/database';

export class BadUserController {
  constructor(private userModel: UserModel) {}

  async getUsers(req: Request, res: Response) {
    try {
      // Simulamos un error aleatorio en aproximadamente 30% de las solicitudes
      if (Math.random() < 0.3) {
        // MALA PRÁCTICA: Devolver un código 200 OK cuando hay un error
        // Esto debería ser un 500 Internal Server Error
        return res.status(StatusCodes.OK).json({
          success: false,
          message: "Error interno del servidor pero devolvemos código 200",
          error_details: "Database connection timeout",
          // Exponemos información sensible del sistema
          server_info: {
            node_version: process.version,
            memory_usage: process.memoryUsage(),
            environment: process.env.NODE_ENV,
            database_path: process.env.DB_PATH || db.name
          }
        });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      // MALA PRÁCTICA: Ignorar los parámetros de ordenación del usuario
      // y usar valores hardcodeados sin informar al cliente
      const sortBy = 'id'; // Ignoramos req.query.sort_by
      const order = 'ASC'; // Ignoramos req.query.order
      
      // MALA PRÁCTICA: SQL Injection vulnerable
      // NUNCA HACER ESTO EN PRODUCCIÓN
      const searchTerm = req.query.search as string || '';
      const query = `
        SELECT id, username, email, created_at, updated_at
        FROM users
        WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'
        ORDER BY ${sortBy} ${order}
        LIMIT ${limit} OFFSET ${(page - 1) * limit}
      `;
      
      const users = db.prepare(query).all();
      const total = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
      
      // MALA PRÁCTICA: Devolver contraseñas y otra información sensible
      res.status(StatusCodes.OK).json({
        users: users, // Incluye todos los adtos si hubeiran contrasenas tambien las mostraria
        pagination: {
          total: total.count,
          page,
          limit,
          total_pages: Math.ceil(total.count / limit)
        },
        query_executed: query, // Exponemos la consulta SQL
        timestamp: new Date().toISOString(),
        // Información de depuración que no debería estar en producción
        debug: {
          query_params: req.query,
          headers: req.headers,
          cookies: req.cookies,
        }
      });
    } catch (error: any) {
      // MALA PRÁCTICA: Devolver un código 404 Not Found para un error de servidor
      // Esto debería ser un 500 Internal Server Error
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Se produjo un error pero devolvemos código 404",
        error: error.toString(),
        stack: error.stack
      });
    }
  }
}
