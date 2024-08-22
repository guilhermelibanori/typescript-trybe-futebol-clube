import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === 'true' || inProgress === 'false') {
    matchController.getMatchByProgress(req, res);
  } else {
    matchController.getAllMatches(req, res);
  }
});
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);
export default router;
