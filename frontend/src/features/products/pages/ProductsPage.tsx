import { useQuery } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';

import { getProducts } from '../api/productsApi';

export function ProductsPage() 
{
  const 
  {
    data: products,
    isLoading,
    isError,
  } = useQuery(
    {
    queryKey: ['products'],
    queryFn: getProducts,
    });

  if (isLoading) 
  {
    return <div>Loading...</div>;
  }

  if (isError) 
  {
    return <div>Failed to load products</div>;
  }

  return (
    <Box>
      <Box
        sx=
        {{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Products
        </Typography>

        <Button variant="contained">
          Add product
        </Button>
      </Box>

      <div>
        {products?.map((product) => (
          <div key={product.id}>
            {product.name}
          </div>
        ))}
      </div>
    </Box>
  );
}