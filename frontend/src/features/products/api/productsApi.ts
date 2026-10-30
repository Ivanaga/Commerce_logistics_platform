import type { Product } from '../types/Product';

export async function getProducts(): Promise<Product[]> 
{
  const response = await fetch('http://localhost:8080/api/products');

  if (!response.ok) 
  {
    throw new Error('Failed to load products');
  }

  return response.json();
}