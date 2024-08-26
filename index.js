import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import Stripe from "stripe";
import dotenv from "dotenv";
import serviceAccount from "./config/firebase-service-account.json" assert { type: "json" };

// Init Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();

app.use(cors());
dotenv.config();

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Hello, this is the root page! 12");
});
let amountValue = "";
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.VITE_STRIPE_WEBHOOK_KEY
      );

      if (event?.type === "checkout.session.completed") {
        const session = event.data.object;
        const amount = session?.amount_total;
        amountValue = amount;
      }
      response.json({ received: true });
    } catch (err) {
      console.error("Webhook Error:", err);
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

// Client side API request
app.post("/api/record-payment", express.json(), async (req, res) => {
  const authToken = req.headers["authorization"]?.split("Bearer ")[1];

  if (!authToken) {
    return res.status(401).send("Authorization token is missing or invalid.");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const uid = decodedToken.uid; // get uid user

    const { currency, paymentStatus, sessionId } = req.body;

    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("payments")
      .doc(sessionId);

    await docRef.set({
      amount_total: amountValue,
      currency: currency,
      payment_status: paymentStatus,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error recording payment:", err.message);
    res.status(500).send(`Server Error: ${err.message}`);
  }
});
app.use(express.json());

app.listen(8888, () => console.log("Running on port 8888 12"));
