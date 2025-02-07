/** @format */

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../styles/Chat.css";
import { Button, Input, MessageCard, Text } from "../components";
import { useChat } from "../hooks/useChat";
import { VscSend } from "react-icons/vsc";

const ChatPage: React.FC = () => {
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    phoneNumber,
    setPhoneNumber,
    message,
    setMessage,
    chatMessages,
    handleSendMessage,
    loading,
  } = useChat(idInstance, apiTokenInstance);

  const senderName = useMemo(() => {
    const info = chatMessages?.find((el) => el.type === "incoming");
    if (typeof info == "object") return info?.senderName;
    return null;
  }, [chatMessages]);

  return (
    <div className="chat-wrapper">
      <Text className="chat-title">Чат WhatsApp</Text>

      <div className="chat-input-wrapper">
        {!chatMessages.length && (
          <Input
            label="Введите номер телефона собеседника"
            labelClassName="chat-input-label"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Введите номер телефона"
          />
        )}
        <div>{!!chatMessages.length && <Text>{senderName}</Text>}</div>
      </div>

      <div className="chat-box">
        {!!chatMessages.length &&
          chatMessages.map((item) => (
            <MessageCard item={item} key={item.idMessage} />
          ))}
      </div>

      <div className="chat-footer">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение"
        />
        <Button
          onClick={handleSendMessage}
          className="chat-button"
          disabled={loading}
        >
          {loading ? "..." : <VscSend className="chat-button-icon" />}
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
