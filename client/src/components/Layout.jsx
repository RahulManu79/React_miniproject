import React from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert2";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },

    // {
    //   name:"Profile",
    //   path:"/profile",
    //   icon:"ri-user-line"
    // }
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  const logout = () => {
    console.log("vannu");
    swal
      .fire({
        title: "Are you sure?",
        text: "You will be Loged out",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          navigate("/login");
          swal.fire("Logedout!", "You have been Logedout.", "success");
        }
      });
  };
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">SH</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}> </i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className={`d-flex menu-item`} onClick={() => logout}>
              <i className="ri-logout-circle-line"> </i>
              {!collapsed && <p onClick={logout}>Logout</p>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <i className="ri-notification-line header-action-icon px-2"></i>
              <Link className="anchor" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
