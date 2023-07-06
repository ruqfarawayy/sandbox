import {
  UserOutlined,
  DashboardOutlined,
  EuroOutlined,
  MenuOutlined,
  PoundOutlined,
  RocketOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  SoundOutlined,
  WalletOutlined,
  SendOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const { Content, Sider } = Layout;
const ContainerSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const menus = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      route: "/dashboard",
    },
    {
      key: "/agent-management-group",
      label: "Agent Management",
      icon: <UserOutlined />,
      children: [
        {
          key: "/agent-management",
          label: "Main",
          icon: <DashboardOutlined />,
          route: "/agent-management",
        },
      ],
    },
    {
      key: "/master-product",
      label: "Master Product",
      icon: <MenuOutlined />,
      children: [
        {
          key: "/voucher",
          label: "Voucher",
          icon: <EuroOutlined />,
          route: "/voucher",
        },
        {
          key: "/warung",
          label: "Warung",
          icon: <PoundOutlined />,
          route: "/warung",
        },
      ],
    },
    {
      key: "/order-management",
      label: "Order Management",
      icon: <ShopOutlined />,
      children: [
        {
          key: "customer-order",
          label: "Customer Order",
          icon: <ShoppingCartOutlined />,
          route: "customer-order",
        },
        {
          key: "cod-order",
          label: "COD Order",
          icon: <RocketOutlined />,
          route: "cod-order",
        },
      ],
    },
    {
      key: "/payment-management",
      label: "Payment Management",
      icon: <WalletOutlined />,
      children: [
        {
          key: "debit-payment",
          label: "Debit Payment",
          icon: <CreditCardOutlined />,
          route: "debit-payment",
        },
        {
          key: "cod-payment",
          label: "COD Payment",
          icon: <SendOutlined />,
          route: "cod-payment",
        },
      ],
    },
    {
      key: "/reporting-analytics",
      label: "Reporting & Analytics",
      icon: <BarChartOutlined />,
      route: "/reporting-analytics",
    },
    {
      key: "/marketing-promotions",
      label: "Marketing & Promotions",
      icon: <SoundOutlined />,
      route: "/marketing-promotions",
    },
    {
      key: "/auth",
      label: "Logout",
      icon: <LogoutOutlined />,
      route: "/auth",
    },
  ];
  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <div className="logo" />
        <Menu
          mode="inline"
          selectedKeys={[router.pathname]}
          defaultOpenKeys={[
            menus.find((item) => {
              const keys = Object.keys(item);
              if (keys.includes("children")) {
                return item.children
                  .map((subItem) => subItem.route)
                  .includes(router.pathname);
              }
            })?.key,
          ]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {menus.map((item) => {
            const keys = Object.keys(item);
            return keys.includes("children") ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => {
                  return (
                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                      <Link href={subItem.route}>{subItem.label}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.route}>{item.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout
        // className="site-layout"
        style={{
          marginLeft: 250,
        }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ContainerSidebar;
