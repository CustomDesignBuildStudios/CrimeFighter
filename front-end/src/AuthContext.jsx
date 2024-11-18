import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const login = (userData) => {
    setUser({
      accountId: userData.ACCOUNTID,
      email: userData.EMAIL,
      firstName: userData.FIRSTNAME,
      lastName: userData.LASTNAME,
      bio: userData.BIO,
      dateCreated: userData.DATECREATED,
      phone: userData.PHONE,
      homeAddress: userData.HOMEADDRESS,
    });
    console.log("Hello" + userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // removes users local data after logout
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
