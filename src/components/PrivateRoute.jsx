import { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import LogIn from "./LogIn/LogIn";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  const [isLogInOpen, setIsLogInOpen] = useState(() => !currentUser);

  if (!currentUser) {
    return (
      <LogIn
        isLogInOpen={isLogInOpen}
        setIsLogInOpen={setIsLogInOpen}
      />
    );
  }

  return children;
};

export default PrivateRoute;
