import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {Link} from '../../styledComponents';


const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 4}}>
          <Link to="/">Finance Tracker</Link>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', justifyContent: 'space-evenly' } }}>
          <Typography variant="subtitle1" component="div">
            <Link to="/categories">Categories</Link>
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Link to="/add-transaction">Add</Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;