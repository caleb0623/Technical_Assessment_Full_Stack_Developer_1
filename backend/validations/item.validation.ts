import { z } from 'zod';

//validate for item
export const ItemSchema = z.object({
  name: z.string().min(1).max(100), 
  description: z.string().max(500).optional(), 
  price: z.number().positive(), 
});

