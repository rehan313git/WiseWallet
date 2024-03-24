import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logged Out Successfully !");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
          <div className="" id="navbarTogglerDemo01">
            <Link className="navbar-brand text-light  " to="/">
              WiseWallet
            </Link>
          </div>
          <div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div className="nav-username  ">
                {loginUser && loginUser.name}
              </div>
              <button
                className=" btn btn-danger nav-logout rounded "
                onClick={logoutHandler}
              >
                LogOut
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
