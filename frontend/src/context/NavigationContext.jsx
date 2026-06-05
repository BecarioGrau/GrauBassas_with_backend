import React, { createContext, useContext, useState, useEffect } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [data, setData] = useState({ menuData: [], productsData: [] });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/navigation.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el JSON", err);
        setLoading(false);
      });
  }, []);

  return (
    <NavigationContext.Provider value={{ ...data, loading }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
