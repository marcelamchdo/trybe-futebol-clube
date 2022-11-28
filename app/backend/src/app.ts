import * as express from 'express';
import UserController from './database/controllers/UserController';
import TeamController from './database/controllers/TeamController';
import MatchesController from './database/controllers/MatchesController';
import jwt from './database/middlewares/jwt';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', UserController.userController);
    this.app.get('/login/validate', UserController.getUser);
    this.app.get('/teams', TeamController.teamController);
    this.app.get('/teams/:id', TeamController.teamById);
    this.app.get('/matches', MatchesController.matchesController);
    this.app.patch('/matches/:id/finish', MatchesController.editMatches);
    this.app.post('/matches', jwt.tokenValidate, MatchesController.insertMatches);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
