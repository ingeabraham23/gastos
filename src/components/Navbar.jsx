import { Link } from 'react-router-dom';
import "./Navbar.css";

import { faCloudArrowDown, faPenToSquare, faPlusCircle, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigationItems = [
  { path: "/", icon: faTableCells, label: "Lista" },
  { path: "/agregar", icon: faPlusCircle, label: "Agregar" },
  { path: "/editar", icon: faPenToSquare, label: "Editar" },
  { path: "/respaldo", icon: faCloudArrowDown, label: "Respaldar" },
];

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {navigationItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link to={item.path} className="nav-link">
              <FontAwesomeIcon
                icon={item.icon}
                size="2x"
                style={{ fontSize: "24px" }}
              />{" "}
              {/* Renderiza el icono de Font Awesome */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
