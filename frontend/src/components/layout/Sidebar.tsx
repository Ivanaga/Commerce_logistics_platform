import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export function Sidebar() 
{
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
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
        <ListItemButton component={Link} to="/products">
          <ListItemText primary="Products" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}