import { useParams } from 'react-router-dom';

export function EditProductPage() 
{
  const { id } = useParams();

  return (
    <div>
      Edit product {id}
    </div>
  );
}