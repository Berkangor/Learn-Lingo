import css from "./Header.module.css";
import { useState } from "react";
import LogIn from "../LogIn/LogIn";
import Registration from "../Registration/Registration";
import LogOut from "../LogOut/LogOut";
import NavLinks from "../NavLinks/NavLinks";
import { useAuth } from "../Context/AuthContext";


export default function Header() {
  const [isLogOutOpen, setIsLogOutOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
 
  const { currentUser } = useAuth();
  
  return (
    <div className={`section ${css.headerContainer}`}>
      <NavLinks/>
      <div className={css.buttonBox}>
        {currentUser ? (
          <button
            type="button"
            onClick={() => setIsLogOutOpen(true)}
            className={css.btnLogIn}
          >
            <svg width="26" height="24" className={css.logIcon}>
              <use href="/sprite.svg#icon-log-in"></use>
            </svg>
            <p>Log out</p>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsLogInOpen(true)}
            className={css.btnLogIn}
          >
            <svg width="26" height="24" className={css.logIcon}>
              <use href="/sprite.svg#icon-log-in"></use>
            </svg>
            <p>Log in</p>
          </button>
        )}

        {!currentUser&& (
          <button
            type="button"
            onClick={() => setIsRegistrationOpen(true)}
            className={css.btnRegist}
          >
            Registration
          </button>
        )}
      </div>
      <LogIn isLogInOpen={isLogInOpen} setIsLogInOpen={setIsLogInOpen} />
      <Registration
        isRegistrationOpen={isRegistrationOpen}
        setIsRegistrationOpen={setIsRegistrationOpen}
      />
      <LogOut isLogOutOpen={isLogOutOpen} setIsLogOutOpen={setIsLogOutOpen} />
    </div>
  );
}