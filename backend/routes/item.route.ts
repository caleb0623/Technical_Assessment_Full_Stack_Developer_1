import {Router} from "express";
import * as itemController  from "../controllers/item.controller";

const router = Router();

router.get('/', itemController.getAllItemsController)
router.get('/:id', itemController.getItemByIdController)
router.post('/', itemController.createItemController);
router.put('/:id', itemController.updateItemController);
router.delete('/:id', itemController.deleteItemController);

export default router;

