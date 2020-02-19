import React, { useState } from 'react';
import {
  Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';
import { withRouter, NavLink as NavLinkRRD} from "react-router-dom";
import * as userService from '../../Services/Api/userService';
import CLogo from '../Common/cLogo';
import profileImg from '../../Rsc/Images/profileimages.png';
import '../../Rsc/Css/header.css';

const Header = ({history}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="pt-2 pr-4 pl-2">
      <Nav tabs>
        <NavItem className="ml-auto">
          <NavLinkRRD to="/home" className="nav-link">
            Home
          </NavLinkRRD>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav>
            <CLogo width="40px" height="40px" src={profileImg} alt="Profile image"/>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => history.push('/user-profile')}
            >
              Profile
            </DropdownItem>
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
