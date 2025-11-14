import {
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ title, email }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleClick = (e) => {
    if (e.key === "/logout") {
      localStorage.removeItem("token");
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
  const userMenu = (
    <Menu
      items={[
        {
          key: "userName",
          label: (
            <div>
              <strong>{title}</strong>
              <br />
              <small style={{ color: "gray" }}>{email}</small>
            </div>
          ),
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
      <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomLeft">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
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
            Dashboard
          </span>
        </div>
      </Dropdown>

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
        <Dropdown overlay={navMenu} placement="bottomRight" trigger={["click"]}>
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
