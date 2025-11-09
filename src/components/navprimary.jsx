import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const primaryLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/introduction", label: "Introduction" },
  { to: "/contract", label: "Contract" },
];

function NavPrimary() {
  return (
    <nav className="nav-primary" aria-label="Primary">
      {primaryLinks.map((link, index) => (
        <Fragment key={link.to}>
          <NavLink
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {link.label}
          </NavLink>
          {index < primaryLinks.length - 1 && (
            <span className="nav-separator" aria-hidden="true">
              {" "}
              |{" "}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export default NavPrimary;
