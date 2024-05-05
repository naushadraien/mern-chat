"use client";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "../store/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
