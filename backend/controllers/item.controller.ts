import { Request, Response, NextFunction } from 'express';
import * as itemService  from "../services/item.service";
import { ItemSchema } from '../validations/item.validation';

export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export const createItemController = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  try {
    const parsedData = ItemSchema.parse(req.body);
    const newItem = await itemService.createItem(parsedData.name, description, parsedData.price);
    res.status(201).json(newItem); 
  } catch (error) {
    
    console.error(error);
    res.status(400).json({ message: 'Failed to create item' });
  }
};

export const getItemByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const item = await itemService.getItemById(Number(id)); 
    res.json(item); 
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to retrieve item' });
  }
};

export const updateItemController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const parsedData = ItemSchema.parse(req.body); 
    const result = await itemService.updateItem(Number(id), parsedData.name, description, parsedData.price);
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update the item' });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  const { id } = req.params; 

  try {
    const result = await itemService.deleteItem(Number(id)); 
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to delete the item' });
  }
};
