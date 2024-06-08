import express, { Application } from 'express';
import {setupCors} from '../middlewares/cors.middleware';
import rootRoutes from '../routes/root.routes';
import userRoutes from '../routes/admin.routes';
import registerRoutes from '../routes/register.routes';
import loginRoutes from '../routes/login.routes';
import logoutRoutes from '../routes/logout.routes';
import solicitudRoutes from '../routes/solicitud.routes';
import db from '../db/connection';
import sessionMiddleware from '../middlewares/session.middleware';
import recursoRoutes from '../routes/recurso.routes'
import releaseResources from '../tasks/releaseResources';
import turnoRoutes from '../routes/turno.routes'


class Server {
  private app: Application;
  private port: string;

  constructor(port: string) {
    this.app = express();
    this.port = port;
    this.middlewares();
    this.routes();
    this.dbConnection();
    this.startTasks();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en el puerto ${this.port}`);
    });
  }

  private routes() {
    this.app.use('/', rootRoutes);
    this.app.use('/api/admin', userRoutes);
    this.app.use('/api/signup', registerRoutes);
    this.app.use('/api/signin', loginRoutes);
    this.app.use('/api/logout', logoutRoutes);
    this.app.use('/api/solicitud', solicitudRoutes);
    this.app.use('/api/recurso', recursoRoutes);
    this.app.use('/api/turno', turnoRoutes);
  }

  private middlewares() {
    // CORS
    this.app.use(setupCors);

    // Configuración de express-session
    this.app.use(sessionMiddleware);

     // Parseamos el body
     this.app.use(express.json());
  }

  private async dbConnection() {
    try {
      await db.authenticate();
      console.log('Base conectada');
    } catch (error) {
      console.log(error);
    }
  }

  private startTasks() {
    releaseResources();
  }
}

export default Server;