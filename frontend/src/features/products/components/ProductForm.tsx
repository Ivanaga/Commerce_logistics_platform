import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export interface ProductFormValues 
{
  sku?: string;
  name: string;
  description: string | null;
  price: number;
}

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
  } = useForm<ProductFormValues>(
  {
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {showSku && (<TextField label="SKU" {...register('sku')}/>)}

        <TextField label="Name" {...register('name')}/>

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
        })}/>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}