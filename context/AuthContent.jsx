import { createContext, useContext, useEffect, useState } from "react";
import { supabase,InsertarUsuarios } from "../index";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user == null) {
          setUser(null);
        
        } else {
          setUser(session?.user);
          // navigate("/")
           console.log("event", event);
           console.log("session USER", session?.user);
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);
  const insertarUsuarios = async (dataProvider, idAuthSupabase) => {
    const p = {
      nombres: dataProvider.name,
      foto: dataProvider.picture,
      idauth_supabase: idAuthSupabase,
    };
    await InsertarUsuarios(p)

  };
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
