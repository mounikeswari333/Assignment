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
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-title">Menu</div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const ItemIcon = menuIcons[item] || FiGrid;

          return (
            <li key={item}>
              <button
                className={`sidebar-button ${activeMenu === item ? "active" : ""}`}
                onClick={() => onMenuClick(item)}
              >
                <span className="sidebar-item-left">
                  <ItemIcon className="sidebar-icon" />
                  <span>{item}</span>
                </span>
                <FiChevronRight className="sidebar-arrow" />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
