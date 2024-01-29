import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";

import AppHeaderDropdown from './AppHeaderDropdown';
import logo from '../../../img/BrasãoUfopa.png'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const MenuAppBar = ({ backStep }) => {
  return (
    <CHeader position="fixed">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to={backStep} component={NavLink}>
              <BsArrowLeft size={30} />
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
