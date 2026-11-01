import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createProductRequest } from '../api/productsApi';
import type { CreateProductRequest } from '../types/CreateProductRequest';
import { ProductForm } from '../components/ProductForm';

export function CreateProductPage()
{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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

            <ProductForm submitLabel="Create" onSubmit={onSubmit} isSubmitting={createMutation.isPending}/>
        </div>
    );
}