import {
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setLoginData } from "../../Redux/service/loggedUserData";
import { Header } from "antd/es/layout/layout";

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleClick = (e) => {
    if (e.key === "/logout") {
      localStorage.removeItem("token");
      dispatch(setLoginData({ user: null, role: null }));
      navigate("/login");
      setCurrent("/login");
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navMenu = (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      items={[
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
        {
          key: "/logout",
          icon: <LogoutOutlined style={{ color: "#dc2626" }} />,
          label: <span style={{ color: "#dc2626" }}>Logout</span>,
        },
      ]}
    />
  );

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <Avatar
          style={{
            backgroundColor: "#2563eb",
            verticalAlign: "middle",
          }}
          size="large"
          icon={<UserOutlined />}
        />

        <span style={{ fontWeight: 600, fontSize: 18, color: "#2563eb" }}>
          {title}
        </span>
      </div>

      {!isMobile && (
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme="light"
          style={{
            marginLeft: "auto",
            borderBottom: "none",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/logout",
              icon: <LogoutOutlined style={{ color: "#dc2626" }} />,
              label: <span style={{ color: "#dc2626" }}>Logout</span>,
            },
          ]}
        />
      )}
      {isMobile && (
        <Dropdown menu={navMenu} placement="bottomRight" trigger={["click"]}>
          <MenuOutlined
            style={{
              fontSize: 26,
              marginLeft: "auto",
              cursor: "pointer",
              padding: 10,
            }}
          />
        </Dropdown>
      )}
    </Header>
  );
}
