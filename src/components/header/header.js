import React, { useState } from 'react';
import {
  Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink 
} from 'reactstrap';
import * as userService from '../../services/api/user.service';

const Header = (props) => {
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
            <img style={{width: "40px", height: "40px"}} src="favicon.ico" alt="Logo"/>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={
                (ev) => userService.logout().then(
                  () => {
                    this.props.history.push('/');
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

export default Header;