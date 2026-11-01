import { z } from 'zod';

export const productFormSchema = z.object(
{
  sku: z.string().min(1, 'SKU is required').optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().nullable(),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;