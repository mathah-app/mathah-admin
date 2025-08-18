
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Navbar as RBNavbar,
  Nav,
  Form,
  Dropdown,
  Button,
} from "react-bootstrap";
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import { Icon } from "@iconify/react/dist/iconify.js";

export default function TopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <RBNavbar className="p-0 fixed-top d-flex flex-row" expand="lg">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link href="/">
          <Image
            src="/assets/images/icon.png"
            alt="logo"
            width={50}
            height={70}
            style={{ borderRadius: "5px", height: "auto" }}
          />
        </Link>
      </div>

      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        {/* <RBNavbar.Toggle className="navbar-toggler align-self-center" /> */}
        <NavbarToggle as={'button'}
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <Icon icon={'mdi:menu'} fontSize={20}  />
        </NavbarToggle>
        <RBNavbar.Collapse id="topnav-collapse">
          <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <div className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input
                  type="text"
                  // className="form-control"
                  placeholder="Search Driver/Riders"
                />
              </div>
            </li>
          </ul>

          <Nav className="navbar-nav navbar-nav-right">
            {/* Create New User Dropdown */}
            <Dropdown
              show={dropdownOpen}
              onToggle={() => setDropdownOpen(!dropdownOpen)}
              className="d-none d-lg-block"
            >
              <Dropdown.Toggle
                as={Button}
                className="nav-link btn btn-success create-new-button"
                style={{ backgroundColor: "#be8900" }}
              >
                + Create New User
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-right navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">Admins</h6>
                <div className="dropdown-divider"></div>

                <Dropdown.Item className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <Icon
                        icon={"mdi:account-key"}
                        fontSize={20}
                        className="text-primary"
                      />
                      {/* <i className="mdi mdi-account-key text-primary"></i> */}
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">Super Admin</p>
                  </div>
                </Dropdown.Item>

                <div className="dropdown-divider"></div>

                <Dropdown.Item className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-account-check text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Normal Admin
                    </p>
                  </div>
                </Dropdown.Item>

                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">See all users</p>
              </Dropdown.Menu>
            </Dropdown>

            {/* Messages */}
            <Nav.Item className="nav-item dropdown border-left">
              <Link href="/" prefetch={false}>
                <div className="nav-link count-indicator dropdown-toggle">
                  <i className="mdi mdi-email"></i>
                  <Icon icon={"mdi:email"} fontSize={20} color="whitesmoke" />
                  <span className="count bg-success"></span>
                </div>
              </Link>
            </Nav.Item>

            {/* Notifications */}
            <Nav.Item className="nav-item dropdown border-left">
              <Link href="/" prefetch={false}>
                <div className="nav-link count-indicator dropdown-toggle">
                  <i className="mdi mdi-bell"></i>
                  <Icon icon={"mdi:bell"} fontSize={20} color="whitesmoke" />
                  <span className="count bg-danger"></span>
                </div>
              </Link>
            </Nav.Item>

            {/* Profile */}
            <Nav.Item className="nav-item dropdown">
              <Link href="/" prefetch={false}>
                <div className="nav-link">
                  <div className="navbar-profile">
                    <Image
                      src="/assets/images/faces/38.png"
                      alt="Thanda"
                      width={30}
                      height={30}
                      className="img-xs rounded-circle"
                    />
                    <p className="mb-0 d-none d-sm-block navbar-profile-name">
                      Thanda
                    </p>
                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                  </div>
                </div>
              </Link>
            </Nav.Item>
          </Nav>
        </RBNavbar.Collapse>

        <RBNavbar.Toggle className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"  />
      </div>
    </RBNavbar>
  );
}
