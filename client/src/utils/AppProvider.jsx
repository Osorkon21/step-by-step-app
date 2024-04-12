import Cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

// Create the context itself
const AppContext = createContext({});

// Create a React hook that will allow other components to use the context 
export const useAppCtx = () => useContext(AppContext);

export default function AppProvider(props) {

  const [user, setUser] = useState({});
  const [tempGoal, setTempGoal] = useState(null);

  function updateUser() {
    verifyUser();
  }

  async function verifyUser() {
    const cookie = Cookie.get("auth-cookie");

    if (!cookie && window.location.pathname !== "/" && (window.location.pathname.includes("/dashboard") || window.location.pathname.includes("/profile")))
      window.location.href = "/";

    try {
      const query = await fetch("/api/users/verify", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      });


      const response = await query.json();

      if (response.result === "success")
        setUser(response.payload);
      else
        setUser({});

    } catch (err) {
      console.log(err.message);
      if (window.location.pathname !== "" && window.location.pathname.includes("/dashboard"))
        window.location.href = "/";
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);


  return (
    <AppContext.Provider value={{ user, tempGoal, setTempGoal, verifyUser, updateUser }}>
      {props.children}
    </AppContext.Provider>
  );
}
