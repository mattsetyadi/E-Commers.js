import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  // MenuItem,
  // Menu,
  Typography,
} from '@material-ui/core';
import { ShoppingCart, HomeRounded } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/commerce.png';
import useStyles from './navbarStyles';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            variant='h6'
            className={classes.title}
            color='inherit'
          >
            <img src={logo} alt='-' height='25px' className={classes.image} />
            Store - MusicianStuff
          </Typography>
          <div className={classes.grow}></div>
          <div className={classes.butto}>
            {location.pathname === '/' ? (
              <IconButton
                component={Link}
                to='/cart'
                aria-label='Show cart items'
                color='inherit'
              >
                <Badge badgeContent={totalItems} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            ) : (
              <IconButton
                component={Link}
                to='/'
                aria-label='Show cart items'
                color='inherit'
              >
                <HomeRounded />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
