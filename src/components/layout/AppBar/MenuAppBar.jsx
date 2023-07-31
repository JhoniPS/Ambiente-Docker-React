import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth'

import Settings from '../../../img/settings.svg'
import Logout from '../../../img/log-out.svg';
import styles from '../../layout/AppBar/style.module.css';
import LinkButton from '../linkbutton/LinkButton';

const MenuAppBar = () => {
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleLogout} // Botão de barra lateral
            aria-label="menu"
            sx={{ mr: 4 }}
          >
            <MenuIcon color='primary' />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color='primary' fontWeight='bold'>
            PAINEL DE CONTROLE
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}  
              >
                <img
                  src={Settings}
                  alt='Cofigurações'
                  className={styles}
                />
                <LinkButton text="Configurações" to="/profile" />
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
              >
                <img
                  src={Logout}
                  alt='Logout'
                  className={styles}
                />
                Sair
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default MenuAppBar
