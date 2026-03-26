import { useState } from "react";
import "./Sidebar.css";
import {
  FiBarChart2,
  FiBriefcase,
  FiChevronRight,
  FiCloud,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiMapPin,
  FiPackage,
  FiSettings,
  FiTool,
  FiTruck,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

const menuIcons = {
  Dashboard: FiHome,
  Leads: FiBarChart2,
  Itineraries: FiMapPin,
  "Google Reviews": FiCloud,
  Vouchers: FiGrid,
  Accounts: FiCreditCard,
  Reports: FiFileText,
  "Customer Support": FiHeadphones,
  "User Settings": FiSettings,
  "Masters Settings": FiTool,
  HRM: FiBriefcase,
  "Asset Management": FiPackage,
  "Itinerary Customers": FiUsers,
  Partners: FiUserCheck,
  Suppliers: FiTruck,
};

const Sidebar = ({ menuItems, activeMenu, onMenuClick, isOpen }) => {
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);

  const handleMenuClick = (item) => {
    if (item === "Leads") {
      setIsLeadsOpen((prev) => !prev);
      return;
    }

    onMenuClick(item);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-title">Menu</div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const ItemIcon = menuIcons[item] || FiGrid;
          const isParentLeads = item === "Leads";
          const isLeadsChildActive = activeMenu === "Leads Data";

          return (
            <li key={item}>
              <button
                className={`sidebar-button ${activeMenu === item ? "active" : ""}`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="sidebar-item-left">
                  <ItemIcon className="sidebar-icon" />
                  <span>{item}</span>
                </span>
                <FiChevronRight className="sidebar-arrow" />
              </button>

              {isParentLeads && isLeadsOpen ? (
                <button
                  className={`sidebar-sub-button ${isLeadsChildActive ? "active" : ""}`}
                  onClick={() => onMenuClick("Leads Data")}
                >
                  <span className="sidebar-item-left">
                    <ItemIcon className="sidebar-icon" />
                    <span>Leads</span>
                  </span>
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
