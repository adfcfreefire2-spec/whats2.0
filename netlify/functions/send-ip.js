const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const data = JSON.parse(event.body);
    const { ip, ciudad, region, pais, isp, userAgent, fecha } = data;
    
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const mensaje = `🐇 \n\n📍, ${pais}\n`;

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
        message: "IP enviada correctamente" 
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