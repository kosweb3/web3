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

// add Buffer to global object window
window.Buffer = Buffer;
// connect to Solana (Devnet або Mainnet)
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export const useStoreWallet = defineStore("connectWallet", () => {
  const isConnected = ref(false);
  const solanaAdres = ref();

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
        solanaAdres.value = response.publicKey.toString();

        // console.log("З якого кошиля плачу:", response.publicKey.toString());
        return response.publicKey;
      } catch (err) {
        startNofification(err.message);
      }
    }
  };

  const checkIfWalletIsConnected = async () => {
    const prov = getProvider();
    if (prov) {
      try {
        const response = await prov.connect({ onlyIfTrusted: true });
        if (response.publicKey) {
          isConnected.value = true;
          solanaAdres.value = response.publicKey.toString();
        }
      } catch (err) {}
    }
  };

  const payBySolana = async (receiverPublicKeyString, price) => {
    //notification store
    const notificationStore = useNotificationStore();
    const { startNofification } = notificationStore;
    // console.log("На який кошильок плачу", receiverPublicKeyString);
    const provider = getProvider();
    if (!provider) return;

    const senderPublicKey = await connectWallet();

    const receiverPublicKey = new PublicKey(receiverPublicKeyString);

    const instruction = SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: receiverPublicKey,
      lamports: price * LAMPORTS_PER_SOL,
    });

    // Create new transaction
    const transaction = new Transaction().add(instruction);

    // get recentBlockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderPublicKey; // custommer payment fee

    // signAndSendTransaction
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
    solanaAdres,
    connectWallet,
    payBySolana,
    checkIfWalletIsConnected,
  };
});
