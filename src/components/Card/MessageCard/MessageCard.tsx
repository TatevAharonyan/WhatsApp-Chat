/** @format */

import React, { FC, useMemo } from "react";
import { TChatMessages } from "../../../hooks/useChat";
import { Text } from "../../Text";
import { BiCheckDouble, BiCheck } from "react-icons/bi";
import "./../../../styles/Chat.css";
import { motion } from "framer-motion";

type TProps = {
  item: TChatMessages;
};

export const MessageCard: FC<TProps> = ({ item }) => {
  const isYou = item.type.startsWith("outgoing");

  // Проверка статуса сообщений показывает соответствующий значок
  const getStatusIcon = useMemo(() => {
    switch (item.statusMessage) {
      case "sent":
        return <BiCheck className="status-icon gray" />;
      case "delivered":
        return <BiCheckDouble className="status-icon gray" />;
      case "read":
        return <BiCheckDouble className="status-icon blue" />;
      default:
        return null;
    }
  }, [item.statusMessage]);

  return (
    <motion.div
      key={item.idMessage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`chat-message-wrapper  ${isYou ? "you" : "other"}`}
    >
      <Text className={`chat-message ${isYou ? "you" : "other"}`}>
        {item.textMessage} {isYou && getStatusIcon}
      </Text>
    </motion.div>
  );
};
