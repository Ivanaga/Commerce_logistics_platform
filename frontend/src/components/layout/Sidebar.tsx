import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const drawerWidth = 240;

const menuItems = 
[
  {
    label: 'Products',
    path: '/products',
    icon: <Inventory2OutlinedIcon />,
  },
  {
    label: 'Inventory',
    path: '/inventory',
    icon: <WarehouseOutlinedIcon />,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    label: 'Warehouses',
    path: '/warehouses',
    icon: <WarehouseOutlinedIcon />,
  },
  {
    label: 'Payments',
    path: '/payments',
    icon: <PaymentsOutlinedIcon />,
  },
  {
    label: 'Shipments',
    path: '/shipments',
    icon: <LocalShippingOutlinedIcon />,
  },
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
          backgroundColor: '#111827',
          color: '#ffffff',
          borderRight: 'none',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700, }}>
          Commerce Logistics
        </Typography>
      </Toolbar>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => 
        {
          const active = location.pathname.startsWith(item.path);

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={active}
              sx={{borderRadius: 2, mb: 0.5,
                '&:hover': 
                {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
                '&.Mui-selected': 
                {
                  backgroundColor: 'rgba(255,255,255,0.14)',
                },
                '&.Mui-selected:hover': 
                {
                  backgroundColor: 'rgba(255,255,255,0.18)',
                },
              }}
            >
            <ListItemIcon sx={{minWidth: 40, color: active ? '#ffffff' : 'rgba(255,255,255,0.7)',}}>
              {item.icon}
            </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}