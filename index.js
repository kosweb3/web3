import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import Stripe from "stripe";
import dotenv from "dotenv";
// import serviceAccount from "./config/firebase-service-account.json" assert { type: "json" };

dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: "web3-dd175",
  private_key_id: process.env.VITE_FIREBASE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.VITE_FIREBASE_ACCOUNT_PRIVATE_KEY.replace(
    /\\n/g,
    "\n"
  ),
  client_email: process.env.VITE_FIREBASE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.VITE_FIREBASE_ACCOUNT_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.VITE_FIREBASE_ACCOUNT_CLIENT_X509,
  universe_domain: "googleapis.com",
};
// Init Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();

app.use(cors());

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Hello, this is the root page! new port 8888 test");
});
let customerDetailsEmail = "";
let customerDetailsAmount = "";
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
        customerDetailsEmail = session?.customer_details?.email;
        customerDetailsAmount = session?.amount_total;
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

    const { currency, paymentStatus, tokenUser } = req.body;

    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("payments")
      .doc(tokenUser);

    await docRef.set({
      customer_amount: customerDetailsAmount,
      customer_email: customerDetailsEmail,
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

app.listen(process.env.PORT || 8888, () =>
  console.log("Running on port 8888 13")
);
