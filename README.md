<!-- @format -->

# 🚀 WhatsApp Chat App (React + Green-API)

### 📌 Описание проекта

Это тестовое задание для интеграции с **Green-API**.  
Приложение позволяет отправлять и получать сообщения WhatsApp через API.

---

## 🚀 Как запустить локально?

1. Склонировать репозиторий:

```bash
  git clone https://github.com/TatevAharonyan/WhatsApp-Chat.git
```

```bash
  cd WhatsApp-Chat
```

2. Установить зависимости:

```bash
  npm install
```

3. Создать `.env` файл и добавить url:

## 🌍 API

Используется [Green-API](https://green-api.com/).
Базовый URL: `https://api.green-api.com`

Для работы требуются:
REACT_APP_BASE_URL: Базовый URL

4. Запустить проект:

```bash
  npm start
```

## 📌 Функционал:

- Авторизация через Green-API
- Отправка и получение сообщений WhatsApp
- Отображение статусов сообщений (sent, delivered, read)
- Обновление статуса сообщений
- Адаптивный UI

## 🛠 Использованные технологии:

- ⚛ **React + TypeScript** – основа проекта
- 🛒 **Redux Toolkit** – управление состоянием
- 🎨 **CSS (WhatsApp-стиль)** – стилизация
- 🌍 **Green-API** – работа с WhatsApp
- 🔧 **Axios** – работа с API
