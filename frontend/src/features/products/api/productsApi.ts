import type { Product } from '../types/Product';
import type { UpdateProductRequest } from '../types/UpdateProductRequest';

export async function getProducts(): Promise<Product[]> 
{
  const response = await fetch('http://localhost:8080/api/products');

  if (!response.ok) 
  {
    throw new Error('Failed to load products');
  }

  return response.json();
}

export async function deactivateProduct(id: number) : Promise<Product[]>
{
  const response = await fetch(`http://localhost:8080/api/products/${id}/deactivate`, { method : 'PATCH', });
  if (!response.ok) 
  {
    throw new Error('Failed to deactivate product!');
  }
  return response.json();
}

export async function activateProduct(id: number): Promise<Product> 
{
  const response = await fetch(`http://localhost:8080/api/products/${id}/activate`,
    {
      method: 'PATCH',
    });

  if (!response.ok) 
  {
    throw new Error('Failed to activate product');
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product>
{
  const response = await fetch(`http://localhost:8080/api/products/${id}`);
  if (!response.ok) 
  {
    throw new Error('Failed to load product');
  }
  return response.json();
}


export async function updateProductRequest(id: number, request: UpdateProductRequest): Promise<Product>
{
  const response = await fetch(`http://localhost:8080/api/products/${id}`, 
  {
    method: 'PATCH',
    headers: 
    {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok)
  {
    throw new Error('Failed to update product');
  }

  return response.json();

}