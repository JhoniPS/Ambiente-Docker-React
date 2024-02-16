import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from '../../../img/BrasãoUfopa.png'
import { useLocation } from 'react-router-dom';

const AppHeaderDropdown = () => {
  const { logout, logoutSIGAA } = useContext(AuthContext);

  const location = useLocation();
  const userProfile = location.pathname.concat('', '/profile');

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Configurações</CDropdownHeader>
        <CDropdownItem href={userProfile}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
        <CDropdownItem href="#" onClick={logoutSIGAA}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout Sigaa
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
