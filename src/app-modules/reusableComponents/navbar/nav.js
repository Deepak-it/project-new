import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate()

  const [showMenuBar, setShowMenuBar] = useState(true) 
  const settings = ['Logout'];

  const onMenuSelect = (e, obj) => {
    e.preventDefault();
    navigate(obj.route);
    setShowMenuBar(!showMenuBar);
  };

  const getLinkClass = (route) => {
    return `nav-link ${pathname === route ? "active" : ""}`;
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  return (
    <>
    {pathname !== '/login' && 
      <div>
        <div style={{borderRadius: '0rem', background:'#dee2e6'}} className="card top-header">
            <div className="top-header-menu">
              <div className="topbar-items nav-left d-flex align-items-center">
                <a href="" className="logo-link text-blue text-decoration-none">
                  <h3 className="logo-link notenetic-text mb-0">
                    <img alt = 'log'/>
                  </h3>
                </a>
                <div className="position-relative ml-3  searchicons">
                </div>
              </div>
              <div className="topbar-items nav-right">
                <ul className="list-unstyled d-flex align-items-center mb-0">
                  <li className="icon-size ml-3 mr-1">
                    <div className="text-darkgrey " style={{ cursor: "pointer" }} /*onClick={handleClockInOutConfirm}*/ >
                      <img className="start-timer-icon" src = '/clock.png' alt = 'clock'/>
                    </div>
                  </li>


                  <li className="icon-size mx-3">
                    <div className="text-darkgrey "  style={{ cursor: "pointer" }} onClick={() => navigate('/add/document')} >
                      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="#021f54" />
                        <path d="M21.6147 15.1979H16.8022V10.3854C16.8022 10.1727 16.7177 9.96866 16.5673 9.81824C16.4169 9.66782 16.2129 9.58331 16.0002 9.58331C15.7874 9.58331 15.5834 9.66782 15.433 9.81824C15.2826 9.96866 15.1981 10.1727 15.1981 10.3854V15.1979H10.3856C10.1729 15.1979 9.96884 15.2824 9.81842 15.4328C9.668 15.5832 9.5835 15.7873 9.5835 16C9.5835 16.2127 9.668 16.4167 9.81842 16.5671C9.96884 16.7176 10.1729 16.8021 10.3856 16.8021H15.1981V21.6146C15.1981 21.8273 15.2826 22.0313 15.433 22.1817C15.5834 22.3321 15.7874 22.4166 16.0002 22.4166C16.2129 22.4166 16.4169 22.3321 16.5673 22.1817C16.7177 22.0313 16.8022 21.8273 16.8022 21.6146V16.8021H21.6147C21.8275 16.8021 22.0315 16.7176 22.1819 16.5671C22.3323 16.4167 22.4168 16.2127 22.4168 16C22.4168 15.7873 22.3323 15.5832 22.1819 15.4328C22.0315 15.2824 21.8275 15.1979 21.6147 15.1979Z" fill="white" />
                        <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#ea4d36.fa-chevron-right" />
                      </svg>

                    </div>
                  </li>


                  <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/user.png" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >

                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          if (setting === 'Logout') {
                            localStorage.clear();
                            navigate('/login')
                          }
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
      
                </ul>
              </div>
            </div>

          </div>
        <div style={{borderRadius: '0rem' }} className="py-2 card menu-header-items">
          <header className="inner-header position-relative">
            <div className="container-fluid d-flex justify-content-between align-items-baseline bgWHite nav-shadow">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                ></button>
                <div
                  className={`collapse navbar-collapse custome-nav cursor-pointer${showMenuBar ? "show" : ""}`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        href="/dashboard"
                        className={getLinkClass("/dashboard")}
                        onClick={(e) => {
                          onMenuSelect(e, { name: "Dashboard", route: "/dashboard" });
                        }}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/document/list"
                        className={getLinkClass("/document/list")}
                        onClick={(e) => {
                          onMenuSelect(e, { name: "Documents", route: "/document/list" });
                        }}
                      >
                        Documents
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/staff/list"
                        className={getLinkClass("/staff/list")}
                        onClick={(e) => {
                          onMenuSelect(e, { name: "Staff", route: "/staff/list" });
                        }}
                      >
                        Staff
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        </div>
      </div>}
    </>
  );
};

export default NavBar;
