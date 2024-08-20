import express from "express";
import bodyParser from "body-parser";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config(); // Завантажує змінні з вашого .env файлу

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY); // Використання секретного ключа Stripe

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, this is the root page!");
});

app.use(bodyParser.raw({ type: "application/json" }));

// Сховище для сесій (у реальному проєкті використовуйте базу даних)
const sessions = {};

app.post("/webhook", (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.VITE_STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log(`Payment for session ${session.id} was successful!`);
    console.log(`Payment amount: ${session.amount_total}`);
    console.log(`Customer email: ${session.customer_details.email}`);

    // Збереження сесії в локальне сховище (підставте збереження в базу даних у реальному проєкті)
    sessions[session.id] = {
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details.email,
      paymentStatus: session.payment_status,
    };
  }

  response.json({ received: true });
});

// Маршрут для отримання інформації про сесію
app.get("/session/:id", (req, res) => {
  const session = sessions[req.params.id];
  if (session) {
    res.json(session);
  } else {
    res.status(404).send("Session not found");
  }
});

app.listen(3000, () => console.log("Running on port 3000"));
