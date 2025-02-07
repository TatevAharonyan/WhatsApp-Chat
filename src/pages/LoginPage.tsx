/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Button, Input, Text } from "../components";

const LoginPage: React.FC = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функция для обработки отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!idInstance && !!apiTokenInstance) {
      // Сохраняем данные в Redux и переходим в чат
      dispatch(setAuth({ idInstance, apiTokenInstance }));
      navigate("/chat");
    }
  };

  return (
    <div className="login-wrapper whatsapp-style">
      <Text className="login-title">Вход в WhatsApp Чат</Text>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="ID Instance:"
          labelClassName="login-label"
          type="text"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          className="login-input"
        />

        <Input
          label="API Token Instance:"
          labelClassName="login-label"
          type="password"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          className="login-input"
        />

        <Button
          type="submit"
          className="login-button"
          disabled={!idInstance && !apiTokenInstance}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
