import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ title, email }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

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
      {/* Avatar + Dropdown */}
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

      {/* Right Menu */}
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
            icon: <DashboardOutlined style={{ fontSize: 18 }} />,
            label: <span className="nav-item">Dashboard</span>,
          },
          {
            key: "/logout",
            label: (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 20,
                  color: "#dc2626",
                  fontWeight: 600,
                  transition: "all 0.3s",
                }}
                className="logout-btn"
              >
                <LogoutOutlined />
                Logout
              </span>
            ),
          },
        ]}
      />
    </Header>
  );
}
