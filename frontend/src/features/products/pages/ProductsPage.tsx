import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Chip, Paper, Table, TableBody, MenuItem,  TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { deactivateProduct, activateProduct, getProducts } from '../api/productsApi';
import type { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { TextField } from '@mui/material';
import { useState } from 'react';

export function ProductsPage() 
{

  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

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

  const filteredProducts = products?.filter((product) => 
  {
    const query = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === 'ALL' ||
      product.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
        <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Products
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Manage your product catalog
          </Typography>
        </Box>


        <Button variant="contained" component={Link} to="/products/new">
          Add product
        </Button>
        </Box>


       <Paper elevation={0} sx={{borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider',}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, p: 2, borderBottom: '1px solid', borderColor: 'divider',}}>
  <TextField size="small" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} sx={{ width: 320, }}/>

  <TextField select size="small" label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} sx={{ width: 150, }}>
    <MenuItem value="ALL">All</MenuItem>
    <MenuItem value="ACTIVE">Active</MenuItem>
    <MenuItem value="INACTIVE">Inactive</MenuItem>
  </TextField>
</Box>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{backgroundColor: '#f8fafc', }}>
            <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product.id} sx={{ '&:hover': { backgroundColor: 'action.hover',},}}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description ?? '-'}</TableCell>
              <TableCell align="right">€{product.price}</TableCell>

              <TableCell>
                <Chip
                  label={product.status}
                  color={product.status === 'ACTIVE' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center',}}>
                <Button size="small" startIcon={<EditOutlinedIcon />} component={Link} to={`/products/${product.id}/edit`}  sx={{ textTransform: 'none',}}>
                  Edit
                </Button>

                <Button size="small" startIcon={<PowerSettingsNewOutlinedIcon />} onClick={() => statusMutation.mutate(product)} sx={{ textTransform: 'none',}}>
                  {product.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Box>
  );
}