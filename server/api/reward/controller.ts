import { Router, type NextFunction, type Request, type Response } from 'express';
import { calculateReward } from './service';

export const handleReward = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {initialReward, gameTime} = req.body;
    try {
        const finalReward = await calculateReward(initialReward, gameTime);
        res.status(200).json({
            success: true,
            message: 'Reward calculated successfully',
            data: finalReward
        });
    } catch (error) {
        next(error);
    }
};


export default (): Router => {
    const app = Router();
    app.post('/score', handleReward);
    return app;
}