import React from "react";
import Link from "next/link";
import { Image, Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useRouter, usePathname } from "next/navigation";

export default function SideBar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const path = usePathname();
  return (
    <nav
      className={`sidebar sidebar-offcanvas ${isOpen ? "active" : ""}`}
      id="sidebar"
    >
      {/* mobile-only close button */}
      <button
        aria-label="Close"
        className="btn btn-link text-light d-lg-none sidebar-close-btn"
        onClick={onClose}
        
      >
        <Icon icon="mdi:close" fontSize={24} />
      </button>
      {/* Logo */}
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <Link href="/" className="sidebar-brand brand-logo">
          <Image src="/assets/images/logo-white.png" alt="logo" />
        </Link>
        <Link href="/" className="sidebar-brand brand-logo-mini">
          <Image
            src="/assets/images/icon.png"
            alt="logo"
            style={{ borderRadius: "5px", width: "40px", height: "auto" }}
          />
        </Link>
      </div>

      <ul className="nav">
        {/* Profile Section */}
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <Image
                  className="img-xs rounded-circle"
                  src="/assets/images/faces/38.png"
                  alt=""
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">Thanda</h5>
                <span>Super Admin</span>
              </div>
            </div>

            {/* Profile Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="profile-dropdown"
                className="p-0 text-dark"
              >
                <i className="mdi mdi-dots-vertical"></i>
                <Icon
                  icon={"mdi:dots-vertical"}
                  fontSize={20}
                  color="lightgray"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="sidebar-dropdown preview-list">
                <Dropdown.Item>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      {/* <Icon name="" /> */}
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  Account settings
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword text-info"></i>
                    </div>
                  </div>
                  Change Password
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  To-do list
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>

        {/* Navigation Category */}
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>

        {/* Menu Links */}
        <li className={`nav-item menu-items ${path == "/" && "active"} `}>
          <Link href="/" className="nav-link ">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
              <Icon icon={"mdi:speedometer"} color="#8f5fe8" fontSize={20} />
            </span>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        <li
          className={`nav-item menu-items ${
            path.includes("/driver") && "active"
          }`}
        >
          <Link href="/drivers" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-account-network"></i>
              <Icon
                icon={"mdi:account-network"}
                color="#ffab00"
                fontSize={20}
              />
            </span>
            <span className="menu-title">Drivers</span>
          </Link>
        </li>

        <li
          className={`nav-item menu-items ${
            path.includes("/rider") && "active"
          }`}
        >
          <Link href="/riders" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-account-multiple"></i>
              <Icon
                icon={"mdi:account-multiple"}
                color="#fc424a"
                fontSize={20}
              />
            </span>
            <span className="menu-title">Riders</span>
          </Link>
        </li>

        <li
          className={`nav-item menu-items ${
            path.includes("/trip") && "active"
          }`}
        >
          <Link href="/trips" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-taxi"></i>
              <Icon icon={"mdi:taxi"} color="#0090e7" fontSize={20} />
            </span>
            <span className="menu-title">Trips</span>
          </Link>
        </li>

        <li
          className={`nav-item menu-items ${
            path.includes("/vehicle") && "active"
          }`}
        >
          <Link href="/vehicles" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-car"></i>
              <Icon icon={"mdi:car"} color="#be8900" fontSize={20} />
            </span>
            <span className="menu-title">Vehicles</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
