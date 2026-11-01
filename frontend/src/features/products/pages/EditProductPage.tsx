import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getProductById } from '../api/productsApi';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { updateProductRequest } from '../api/productsApi';
import type { UpdateProductRequest } from '../types/UpdateProductRequest';

export function EditProductPage() 
{
  const { id } = useParams();
  // contains info about all requests by keys
  const queryClient = useQueryClient();
  // this fn is responsible for navigating to another URLs pages just like link tag but in js
  const navigate = useNavigate();

  const productId = Number(id);

  // this fn gives us important funcs to handle fields + queries using TanStack register for connecting to wrappaer, reset to set values and handleSubmit for preparing data for PATCH request
  const 
  {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateProductRequest>();

  // this fn makes a query using queryFn and contains states of queries
  const 
  {
    data: product,
    isLoading,
    isError,
  } = useQuery(
    {
        queryKey: ['products', productId],
        queryFn: () => getProductById(productId),
    });
  // this fn is for tracking and inserting values into fields dependencies are in array 2nd parameter (so if something of it changes fn will be called again)
  useEffect(() => 
  {
    if (product) 
    {
        reset(
        {
            name: product.name,
            description: product.description,
            price: product.price,
        });
    }
  }, [product, reset]);

  // mutation for PATCH request
  const updateMutation = 
    useMutation(
    {
        mutationFn: (request: UpdateProductRequest) =>
            updateProductRequest(productId, request),

        onSuccess: () => 
        {
            queryClient.invalidateQueries(
            {
                queryKey: ['products'],
            });

            navigate('/products');
        },
    });

    // mutation (PATCH request)
    const onSubmit = (data: UpdateProductRequest) => 
    {
        updateMutation.mutate(data);
    };

  if (isLoading) 
  {
    return <div>Loading...</div>;
  }

  if (isError || !product) 
  {
    return <div>Failed to load product</div>;
  }

  return (
    <div>
      <h1>Edit {product.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />

        <input {...register('description')} />

        <input type="number" step="0.01" {...register('price', { valueAsNumber: true })}/>

        <button type="submit">
            Save
        </button>
      </form>
    </div>
  );
}