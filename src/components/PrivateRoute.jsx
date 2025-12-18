import { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import LogIn from "./LogIn/LogIn";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // İlk render'da kullanıcı yoksa modal açık başlasın
  const [isLogInOpen, setIsLogInOpen] = useState(() => !currentUser);

  // Kullanıcı yoksa login bileşenini göster
  if (!currentUser) {
    return (
      <LogIn
        isLogInOpen={isLogInOpen}
        setIsLogInOpen={setIsLogInOpen}
      />
    );
  }

  // Kullanıcı varsa çocukları (korunan route içeriğini) göster
  return children;
};

export default PrivateRoute;
