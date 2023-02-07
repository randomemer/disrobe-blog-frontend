import classNames from "classnames";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style.scss";

export default function Settings() {
  useEffect(() => {});

  return (
    <div className="settings-container">
      <div className="settings-side-nav">
        <ul className="settings-tabs">
          {SETTINGS_SUBROUTES.map(({ path, name }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                classNames("link", "settings-tab", {
                  "settings-tab--active": isActive,
                })
              }
            >
              {name}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
}

const SETTINGS_SUBROUTES = [
  { path: "account", name: "Account" },
  { path: "notifications", name: "Notifications" },
];
