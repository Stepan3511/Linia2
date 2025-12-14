export const sendTelegramMessage = async (message: string) => {
  // Dev
  // const chatId = "-1002408471346"; // chat_id
  // const botToken = "7655914747:AAHasMCKmYpMKXxI_IVjTXWWeXiDzVWcZvE"; // токен бота

  // Prod
  const chatId = "-1002269675808"; // chat_id
  const botToken = "7324404454:AAHzqYTqMizMVMnYIv20kUt2Poe1WsQd-o8"; // токен бота

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      // Если статус ответа не 2xx
      const errorDetails = await response.json();
      console.error("Ошибка Telegram API:", errorDetails);
      throw new Error(
        `Ошибка при отправке сообщения в Telegram: ${errorDetails.description}`
      );
    }

    const result = await response.json();
    console.log("Сообщение успешно отправлено в Telegram:", result);
    return result;
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error);
    throw error; // Прокидываем ошибку дальше, если требуется
  }
};
