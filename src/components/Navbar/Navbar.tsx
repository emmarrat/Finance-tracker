import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from '../../styledComponents';


const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Link to="/">Finance Tracker</Link>
          </Typography>

          <Typography variant="subtitle1" component="div">
            <Link to="/categories">Categories</Link>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;