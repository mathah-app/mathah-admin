"use client";

import { useAuth } from "@/context/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

export default function TopNavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // optional: you can also redirect after logout
      window.location.href = "/auth/login"; 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      {/* Logo (Mobile only) */}
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link href="/">
          <Image
            src="/assets/images/icon.png"
            alt="logo"
            width={43}
            height={70}
            style={{ borderRadius: "5px", height: "auto", marginLeft:25 }}
          />
        </Link>
      </div>

      {/* Navbar Menu Wrapper */}
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        {/* Toggle Button */}
        {/* <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
           onClick={toggleSidebar}
        >
          <span className="mdi mdi-menu"></span>
          <Icon icon={'mdi:menu'} />

        </button> */}

        {/* Search */}
        <ul className="navbar-nav w-100">
          <li className="nav-item w-100">
            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
              <input
                type="text"
                className="form-control"
                placeholder="Search Driver/Riders"
              />
            </form>
          </li>
        </ul>

        {/* Right Side Menus */}
        <ul className="navbar-nav navbar-nav-right">
          {/* Create New User */}
          <li className="nav-item dropdown d-none d-lg-block">
            <Dropdown show={showCreate} onToggle={() => setShowCreate(!showCreate)}>
              <Dropdown.Toggle
                as="a"
                className="nav-link btn btn-success create-new-button"
                id="createbuttonDropdown"
              >
                + Create New User
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">Admins</h6>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-account-key "></i>
                <Icon icon={'mdi:account-key'} fontSize={20} className="text-primary" />

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
                      <i className="mdi mdi-account-check "></i>
                <Icon icon={'mdi:account-check'} fontSize={20}  color="#966b00"/>

                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">Normal Admin</p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">See all users</p>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          {/* Messages */}
          <li className="nav-item dropdown border-left">
            <Dropdown show={showMessages} onToggle={() => setShowMessages(!showMessages)}>
              <Dropdown.Toggle as="a" className="nav-link count-indicator dropdown-toggle">
                <Icon icon={'mdi:email'} fontSize={20} />
                
                <span className="count bg-success"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="preview-item">
                  <div className="preview-thumbnail">
                    <Image
                      src="/assets/images/faces/face4.jpg"
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-circle profile-pic"
                    />
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">Testing User</p>
                    <p className="text-muted mb-0">1 Minute ago</p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">4 new messages</p>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown border-left">
            <Dropdown show={showNotifications} onToggle={() => setShowNotifications(!showNotifications)}>
              <Dropdown.Toggle as="a" className="nav-link count-indicator dropdown-toggle">
                <Icon icon={'mdi:bell'} fontSize={20} />
                <span className="count bg-danger"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi  text-success"></i>
                <Icon icon={'mdi:calendar'} fontSize={20} />

                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Testing Notifications</p>
                    <p className="text-muted ellipsis mb-0">
                      Just a reminder that you have a Notification
                    </p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">See all notifications</p>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          {/* Profile */}
          <li className="nav-item dropdown">
            <Dropdown show={showProfile} onToggle={() => setShowProfile(!showProfile)}>
              <Dropdown.Toggle as="a" className="nav-link" id="profileDropdown">
                <div className="navbar-profile">
                  <Image
                    src="/assets/images/faces/38.png"
                    alt="profile"
                    width={35}
                    height={35}
                    className="img-xs rounded-circle"
                  />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">Thanda</p>
                  
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">Profile</h6>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                      <Icon icon={'mdi:settings'} />
                      
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <Button className="dropdown-item preview-item" onClick={handleLogout}  >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                      <Icon icon={'mdi:logout'} color="red" />

                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Log out</p>
                  </div>
                </Button>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">Advanced settings</p>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleSidebar}
        >
          <Icon icon={'mdi:menu'} />
        </button>
      </div>
    </nav>
  );
}

