// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Avatar } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';

// import Settings from '../../../img/settings.svg';
// import Logout from '../../../img/log-out.svg';
// import styles from '../../layout/AppBar/style.module.css';
// import LinkButton from '../linkbutton/LinkButton';
// import Hidden from '@mui/material/Hidden';

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';

import AppHeaderDropdown from './AppHeaderDropdown';
import logo from '../../../img/BrasãoUfopa.png'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


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
    <CHeader position="fixed">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
}

export default MenuAppBar;
