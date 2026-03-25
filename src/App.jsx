import { useState } from "react";
import { GiAirplane } from "react-icons/gi";
import "./App.css";
import "./components/Navbar.css";
import "./components/Sidebar.css";
import "./components/SearchForm.css";
import "./components/Home.css";
import "./components/FlightList.css";
import "./components/FlightCard.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const menuItems = [
  "Dashboard",
  "Leads",
  "Itineraries",
  "Google Reviews",
  "Vouchers",
  "Accounts",
  "Reports",
  "Customer Support",
  "User Settings",
  "Masters Settings",
  "HRM",
  "Asset Management",
  "Itinerary Customers",
  "Partners",
  "Suppliers",
];

const App = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`app-layout ${isSidebarOpen ? "" : "sidebar-collapsed"}`}>
      <Sidebar
        menuItems={menuItems}
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
        isOpen={isSidebarOpen}
      />

      <div className="content-area">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="main-content">
          {activeMenu === "Dashboard" ? (
            <Home />
          ) : (
            <section className="empty-state" key={activeMenu}>
              <div className="global-flight-runner" aria-hidden="true">
                <GiAirplane className="global-flight-plane" />
              </div>
              <div className="empty-state-text">No data available</div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
