import { NavLink } from "react-router-dom";
import WomanLogo from "../../../public/woman.svg";
import css from "./NavLinks.module.css";
import { useAuth } from "../Context/AuthContext";

export default function NavLinks() {
  const { currentUser } = useAuth();
   const getActiveClass = ({ isActive }) => (isActive ? css.activeLink : css.link);
  return (
    <>
      <nav>
        <NavLink to="/" className={css.navLogo}>
          <img src={WomanLogo} className={css.logo} alt="Logo" />
          <p className={css.logoText}>LearnLingo</p>
        </NavLink>
      </nav>

      <nav className={css.nav}>
        <NavLink to="/" className={getActiveClass}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={getActiveClass}>
          Teachers
        </NavLink>
        {currentUser && (
          <NavLink to="/favorites" className={getActiveClass}>
            Favorites
          </NavLink>
        )}
      </nav>
    </>
  );
}