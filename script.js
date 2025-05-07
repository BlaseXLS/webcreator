document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.ready();

  const userInfo = tg.initDataUnsafe?.user || {};
  const username = userInfo.username || "неизвестно";
  const userId = userInfo.id || "неизвестен";
  const fullName = userInfo.first_name + (userInfo.last_name ? " " + userInfo.last_name : "");

  document.getElementById("status").innerHTML =
    `<p>👤 Telegram: <strong>@${username}</strong><br>🆔 ID: <strong>${userId}</strong><br>🛒 Заказов ранее: <strong>1</strong></p>`;

  document.getElementById("orderForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const order = {
      name: formData.get("name"),
      projectType: formData.get("projectType"),
      details: formData.get("details"),
      telegram: "@" + username,
      id: userId,
      fullName: fullName
    };

    const message = `🆕 Новый заказ Web App:

👤 Имя: ${order.name}
📦 Проект: ${order.projectType}
📝 Детали: ${order.details}

💬 Telegram: ${order.telegram}
🆔 ID: ${order.id}
`;

    try {
      const botToken = "8038364790:AAFwzeQ2rY-Q0S9Ir1g0b5rG6fLs_tNEjck"; // ЗАМЕНИ на токен своего бота
      const chatId = "@krelani"; // или числовой ID

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });

      document.getElementById("status").innerText = "✅ Заявка успешно отправлена!";
      tg.close();
    } catch (err) {
      document.getElementById("status").innerText = "❌ Ошибка: " + err.message;
    }
  });
});