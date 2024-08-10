import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("adhunikAdmin");
    if (user) setUser(JSON.parse(user));
    setLoading(false);
  }, [refresh]);

  const value = { user, setUser, loading, setLoading, refresh, setRefresh };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserContext;
