import React, { useState } from 'react';
import {
  Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink 
} from 'reactstrap';
import { withRouter } from "react-router-dom";
import * as userService from '../../services/api/user.service';
import CLogo from '../common/CLogo';
import imgLogo from '../../rsc/images/favicon.ico';

const Header = ({history}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="pt-2 pr-4 pl-2">
      <Nav tabs>
        <NavItem className="ml-auto">
          <NavLink href="/" active>Home</NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav>
            <CLogo width="40px" height="40px" src={imgLogo} alt="Profile image"/>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={
                (ev) => userService.logout().then(
                  () => {
                    history.push('/');
                  }
                )
              }
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default withRouter(Header);