/** @format */

import React, { FC, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const PrivateRoute: FC<{ element: ReactNode }> = ({ element }) => {
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );
  // Проверяем, если юзер не залогинен, открываем страницу логина.
  return idInstance && apiTokenInstance ? <>{element}</> : <Navigate to="/" />;
};

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;
