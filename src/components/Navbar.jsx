import "./Navbar.css";
import {
  FiAlertTriangle,
  FiBell,
  FiCheckSquare,
  FiChevronDown,
  FiGrid,
} from "react-icons/fi";

const Navbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const navActions = [
    { id: "apps", icon: FiGrid, label: "Apps", badge: null, color: "gray" },
    {
      id: "tasks",
      icon: FiCheckSquare,
      label: "Tasks",
      badge: "52",
      color: "green",
    },
    {
      id: "notifications",
      icon: FiBell,
      label: "Notifications",
      badge: "1",
      color: "blue",
    },
    {
      id: "alerts",
      icon: FiAlertTriangle,
      label: "Alerts",
      badge: "15",
      color: "red",
    },
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="hamburger-button"
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="logo">gogaga</div>
      </div>

      <div className="navbar-right">
        <div className="navbar-actions">
          {navActions.map((action) => {
            const ActionIcon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                className={`nav-icon-button ${action.color}`}
                aria-label={action.label}
              >
                <ActionIcon />
                {action.badge ? (
                  <span className="nav-badge">{action.badge}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="profile">
          <div className="profile-avatar">GK</div>
          <div className="profile-name">Girish Kumar</div>
          <FiChevronDown className="profile-chevron" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
