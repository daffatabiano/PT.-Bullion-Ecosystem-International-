import { Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuOutlined
} from "@ant-design/icons";
import './sidebar-custom.css';

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "User Aktif"
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Menu 2"
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Menu 3"
  },
  {
    key: "4",
    icon: <FileTextOutlined />,
    label: "Menu 4"
  },
  {
    key: "5",
    icon: <MenuUnfoldOutlined />,
    label: "Menu 5"
  }
];

export default function Sidebar({ selectedKey = "1", onSelect }) {
  return (
    <div className="h-full flex flex-col bg-white shadow-sm">
      <div className="px-6 py-4 mb-4 flex items-center justify-between gap-2">
        <img src="/images/logo.png" alt="logo" className="w-24" />
        <MenuOutlined />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        items={items}
        onClick={onSelect}
        className="border-none custom-sidebar-menu"
      />
    </div>
  );
}
