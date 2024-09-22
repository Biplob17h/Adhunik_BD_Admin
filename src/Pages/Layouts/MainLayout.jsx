import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../ContextApi/UserContext";
import Login from "../Login/Login";
import toast from "react-hot-toast";

const MainLayout = () => {
  const { user, loading, setLoading, refresh, setRefresh } =
    useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("adhunikAdmin");
    toast.success("logout successful");
    window.location.reload();
  };
  return (
    <div>
      {loading ? (
        <>loading...</>
      ) : (
        <div>
          {user?.email ? (
            <div>
              <div className="drawer lg:drawer-open">
                <input
                  id="PrimaryDrawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label
                    htmlFor="PrimaryDrawer"
                    className="btn btn-primary drawer-button lg:hidden"
                  >
                    Open drawer
                  </label>
                  <Outlet />
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="PrimaryDrawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
                    {/* Sidebar content here */}
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/order"}>Order</Link>
                    </li>
                    <li>
                      <Link to={"/category"}>Category</Link>
                    </li>
                    <li>
                      <Link to={"/vendors"}>Vendors </Link>
                    </li>
                    <li>
                      <Link to={"/application"}>Vendor Application </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      )}
    </div>
  );
};

export default MainLayout;
