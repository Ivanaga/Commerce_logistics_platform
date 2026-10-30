import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography} from '@mui/material';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = 
[
  { label: 'Products', path: '/products' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'Orders', path: '/orders' },
  { label: 'Warehouses', path: '/warehouses' },
  { label: 'Payments', path: '/payments' },
  { label: 'Shipments', path: '/shipments' },
];

export function Sidebar() 
{
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': 
        {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          Commerce Logistics
        </Typography>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}