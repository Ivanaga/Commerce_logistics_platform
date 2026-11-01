import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { deactivateProduct, activateProduct, getProducts } from '../api/productsApi';
import type { Product } from '../types/Product';
import { Link } from 'react-router-dom';

export function ProductsPage() 
{

  const queryClient = useQueryClient();

  const statusMutation = useMutation({ mutationFn: async (product: Product) => 
    {
      if (product.status === 'ACTIVE') 
      {
        return deactivateProduct(product.id);
      }

      return activateProduct(product.id);
    },

    onSuccess: () => 
    {
      queryClient.invalidateQueries(
      {
        queryKey: ['products'],
      });
    },
  });
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

        <Button variant="contained" component={Link} to="/products/new">
          Add product
        </Button>
      </Box>

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description ?? '-'}</TableCell>
              <TableCell>€{product.price}</TableCell>

              <TableCell>
                <Chip
                  label={product.status}
                  color={product.status === 'ACTIVE' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button size="small" component={Link} to={`/products/${product.id}/edit`}>
                  Edit
                </Button>

                <Button size="small" onClick={() => statusMutation.mutate(product)}>
                  {product.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}