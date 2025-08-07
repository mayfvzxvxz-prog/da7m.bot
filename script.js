// ضع هنا بيانات تطبيق ديسكورد وويب هوك الخاص بك
const CLIENT_ID = "1244667808529387665";
const REDIRECT_URI = "https://mayfvzxvxz-prog.github.io/da7m.bot/"; // مثال: https://yourdomain.com
const WEBHOOK_URL = "https://discord.com/api/webhooks/1403049111414116563/oPOnDaR8oxRdkcsgiShUR9aaug_8CJRB5ocJhrYxy5rleFFAUXDLgOWp_IM-2fWJfxs4";

// زر تسجيل الدخول
document.getElementById('login-discord').onclick = function() {
  window.location.href =
    `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
};

// عند العودة من ديسكورد وتواجد التوكن
window.onload = function() {
  const hash = window.location.hash;
  if (hash.includes('access_token')) {
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');
    document.getElementById('order-section').style.display = 'block';
    // جلب بيانات المستخدم
    fetch('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(user => {
      window.discordUser = user;
      document.getElementById('output').style.display = 'block';
      document.getElementById('output').textContent = `مرحباً ${user.username}! يمكنك الآن إرسال طلب شراء.`;
    });
  }
};

// إرسال الطلب إلى ويب هوك
document.getElementById('submit-order').onclick = function() {
  const details = document.getElementById('order-details').value;
  if (!details) return alert("يرجى كتابة تفاصيل الطلب!");
  const user = window.discordUser || {};
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `طلب جديد من [${user.username}#${user.discriminator}] (ID: ${user.id})
تفاصيل الطلب: ${details}`
    })
  })
  .then(() => {
    document.getElementById('output').textContent = "تم إرسال الطلب بنجاح! سنقوم بالتواصل معك قريبًا.";
  })
  .catch(() => {
    document.getElementById('output').textContent = "حدث خطأ أثناء إرسال الطلب.";
  });
};
