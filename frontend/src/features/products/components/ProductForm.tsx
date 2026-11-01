import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  productFormSchema,
  type ProductFormValues
} from '../schemas/productSchema';

interface ProductFormProps 
{
  defaultValues?: ProductFormValues;
  showSku?: boolean;
  submitLabel: string;
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting?: boolean;
}

export function ProductForm(
{
  defaultValues,
  showSku = true,
  submitLabel,
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) 
{
  const 
  {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({defaultValues, resolver: zodResolver(productFormSchema),});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {showSku && (<TextField label="SKU" {...register('sku')} error={!!errors.sku} helperText={errors.sku?.message}/>)}

        <TextField label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message}/>

        <TextField label="Description" {...register('description')}/>

        <TextField label="Price" type="number" slotProps=
        {{
            htmlInput: 
            {
                step: '0.01',
            },
        }}
        {...register('price', 
        {
            valueAsNumber: true,
        })} error={!!errors.price} helperText={errors.price?.message}/>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}