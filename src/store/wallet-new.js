import router from "@/router";
import { ref } from "vue";
import { defineStore } from "pinia";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { useNotificationStore } from "@/store/notification.js";

// Додаємо Buffer до глобального об'єкта window
window.Buffer = Buffer;
// Підключаємося до мережі Solana (Devnet або Mainnet)
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export const useStoreWallet = defineStore("connectWallet", () => {
  const isConnected = ref(false);

  const toggleWalletConnection = () => {
    if (isConnected.value) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  // Перевіряємо, чи доступний Phantom гаманець
  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    window.open("https://phantom.app", "_blank");
  };

  // connect Phantom and get key
  const connectWallet = async () => {
    //notification store
    const notificationStore = useNotificationStore();
    const { startNofification } = notificationStore;

    const provider = getProvider();
    if (provider) {
      try {
        const response = await provider.connect();
        isConnected.value = !!response.publicKey;
        console.log("З якого кошиля плачу:", response.publicKey.toString());
        return response.publicKey;
      } catch (err) {
        startNofification(err.message);
      }
    }
  };

  // Відключення від гаманця
  const disconnectWallet = async () => {
    const prov = getProvider();
    if (prov) {
      try {
        await prov.disconnect();
        isConnected.value = false;
        console.log("Wallet disconnected");
      } catch (err) {
        console.error("Failed to disconnect wallet", err);
      }
    }
  };

  const checkIfWalletIsConnected = async () => {
    const prov = getProvider();
    if (prov) {
      const response = await prov.connect({ onlyIfTrusted: true });
      if (response.publicKey) {
        isConnected.value = true;
      }
    }
  };

  // Відправка транзакції
  const payBySolana = async (receiverPublicKeyString, price) => {
    //notification store
    const notificationStore = useNotificationStore();
    const { startNofification } = notificationStore;
    console.log("На який кошильок плачу", receiverPublicKeyString);
    const provider = getProvider();
    if (!provider) return;

    // Підключаємо гаманець
    const senderPublicKey = await connectWallet();

    // Публічний ключ отримувача
    const receiverPublicKey = new PublicKey(receiverPublicKeyString);

    const instruction = SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: receiverPublicKey,
      lamports: price * LAMPORTS_PER_SOL, // Кількість SOL
    });

    // Створюємо транзакцію
    const transaction = new Transaction().add(instruction);

    // Отримуємо recentBlockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderPublicKey; // Додаємо відправника як платника комісії

    // Підписуємо та відправляємо транзакцію
    try {
      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature, "confirmed");
      sessionStorage.setItem("signature", signature);
      router.push({ name: "success-payment" });
      return signature;
    } catch (err) {
      startNofification(err.message);
    }
  };

  return {
    isConnected,
    toggleWalletConnection,
    payBySolana,
    checkIfWalletIsConnected,
  };
});
