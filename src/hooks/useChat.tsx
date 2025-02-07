/** @format */

import { useState, useEffect } from "react";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  getHistoryMessages,
} from "../store/api/whatsapp";

export type TChatMessages = {
  type: "incoming" | "outgoing";
  statusMessage: "sent" | "delivered" | "read";
  textMessage?: string;
  senderName?: string;
  idMessage?: string;
};

export const useChat = (idInstance: string, apiTokenInstance: string) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<TChatMessages[]>([]);
  const [loading, setLoading] = useState(false);

  // Функция для отправки сообщения
  const handleSendMessage = async () => {
    // Проверяем корректность необходимых данных
    if (!message.trim() || !phoneNumber.trim()) {
      return;
    }
    setLoading(true);
    try {
      const data = await sendMessage(
        idInstance,
        apiTokenInstance,
        phoneNumber,
        message
      );
      // После успешной отправки добавляем новое сообщение в список переписки
      setChatMessages((prev) => [
        ...prev,
        {
          type: "outgoing",
          textMessage: message,
          senderName: "",
          idMessage: data.idMessage,
          statusMessage: "sent",
        },
      ]);
      // Поле ввода делаем пустым
      setMessage("");
    } catch {
      console.error("Ошибка при отправке. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения сообщений
  const fetchMessages = async () => {
    try {
      const data = await getMessages(idInstance, apiTokenInstance);
      // Если данных нет, ничего не делаем
      if (!data) return;

      const currentChatId = `${phoneNumber}@c.us`;

      // Обрабатываем входящее сообщение
      if (data.body.typeWebhook === "incomingMessageReceived") {
        // Проверяем наличии сообщение и фильтруем по юзеру
        if (
          data.body.messageData?.textMessageData?.textMessage &&
          data.body.senderData?.chatId === currentChatId
        ) {
          const receivedMessage =
            data.body.messageData.textMessageData.textMessage;
          setChatMessages((prev) => [
            ...prev,
            {
              type: "incoming",
              textMessage: receivedMessage,
              senderName:
                data.body.senderData?.senderContactName ||
                data.body.senderData?.chatName,
              idMessage: data.body.idMessage,
              statusMessage: "delivered",
            },
          ]);
        }
      }

      //Обрабатываем обновление статуса исходящих сообщений
      if (data.body.typeWebhook === "outgoingMessageStatus") {
        setChatMessages((prev) =>
          prev.map((el) =>
            el.idMessage === data.body.idMessage
              ? { ...el, statusMessage: data.body.status }
              : el
          )
        );
      }

      //Удаляем сообщение, если оно было обработано
      if (data !== null) {
        await deleteMessage(idInstance, apiTokenInstance, data.receiptId);
      }
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  //Функция извлечения истории чата
  const fetchHistoryMessages = async () => {
    try {
      const data = await getHistoryMessages(
        idInstance,
        apiTokenInstance,
        phoneNumber
      );

      if (data?.length) {
        // Фильтруем лишние сообщение, оставляем только текстовые,
        //  и берём нужные данные
        const chatHistory: TChatMessages[] = data
          .reverse()
          .filter(
            (el: any) =>
              el.typeMessage === "textMessage" ||
              el.typeMessage === "extendedTextMessage"
          )
          .map((el: any) => ({
            type: el.type,
            statusMessage: el.statusMessage || "",
            textMessage: el.textMessage,
            senderName: el.senderContactName || el.senderName || "Вы:",
            idMessage: el.idMessage,
          }));

        setChatMessages(chatHistory);
      }
    } catch {
      console.error("Ошибка при получении истории чата.");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phoneNumber.length > 10) {
      fetchHistoryMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [phoneNumber]);

  return {
    phoneNumber,
    setPhoneNumber,
    message,
    setMessage,
    chatMessages,
    handleSendMessage,
    loading,
  };
};
