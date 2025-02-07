/** @format */

import React, { FC } from "react";
import "../../styles/Input.css";
import { Text } from "../Text";

type InputProps = {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
};

export const Input: FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  className = "",
  labelClassName = "",
  error = "",
}) => {
  return (
    <>
      {label && <Text className={`${labelClassName}`}>{label}</Text>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${className}`}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};
