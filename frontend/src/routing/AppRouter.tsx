import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProductsPage } from '../features/products/pages/ProductsPage';
import { EditProductPage } from '../features/products/pages/EditProductPage';
import { CreateProductPage } from '../features/products/pages/CreateProductPage';

export function AppRouter() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/products/new" element={<CreateProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}