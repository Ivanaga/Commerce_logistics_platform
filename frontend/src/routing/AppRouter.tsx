import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProductsPage } from '../features/products/pages/ProductsPage';

export function AppRouter() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}