import { Router } from 'express';
import rewardController from './reward/controller'

export default (): Router => {
    const app = Router();
    app.use('/', rewardController());
    return app
}