import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createProductRequest } from '../api/productsApi';
import type { CreateProductRequest } from '../types/CreateProductRequest';

export function CreateProductPage()
{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // here we dont need reset because nothing should be inserted from backend
    const 
    {
        register,
        handleSubmit,
    } = useForm<CreateProductRequest>();

    // mutation for POST request
    const createMutation = useMutation(
    {
        mutationFn: (request: CreateProductRequest) =>
        createProductRequest(request),

        onSuccess: () => 
        {
            queryClient.invalidateQueries(
            {
                queryKey: ['products'],
            });

            navigate('/products');
        },
    });

    // onSubmit for mutation
    const onSubmit = (data: CreateProductRequest) => 
    {
        createMutation.mutate(data);
    };
    return (
        <div>
        <h1>Create product</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="SKU" {...register('sku')}/>

            <input placeholder="Name" {...register('name')}/>

            <input placeholder="Description" {...register('description')}/>

            <input type="number" step="0.01" placeholder="Price" {...register('price', 
            {
                valueAsNumber: true,
            })}
            />

            <button type="submit">
            Create
            </button>
        </form>
        </div>
    );
}