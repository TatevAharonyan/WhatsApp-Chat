/** @format */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Функция для отправке сообщения
export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  message: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      { chatId: `${phoneNumber}@c.us`, message }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    throw error;
  }
};

//Функция для получение сообщения
export const getMessages = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    throw error;
  }
};

// Функция для удаление сообщения из очереди
export const deleteMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number
) => {
  try {
    await axios.delete(
      `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
    );
  } catch (error) {
    console.error("Ошибка при удалении сообщения:", error);
  }
};

// Функция получить историю сообщений чата

export const getHistoryMessages = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
      { chatId: `${phoneNumber}@c.us`, count: 100 }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении историю сообщений чата:", error);
  }
};
