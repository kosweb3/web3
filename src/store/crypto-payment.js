import router from "@/router";
import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { useNotificationStore } from "@/store/notification.js";
import { useBaseStore } from "@/store/base.js";

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

  const disconnectWallet = async () => {
    //notification store
    const notificationStore = useNotificationStore();
    const { startNofification } = notificationStore;

    const provider = getProvider();
    if (provider) {
      try {
        await provider.disconnect();
        isConnected.value = false;
        solanaAdres.value = null;
        sessionStorage.removeItem("walletConnected");
      } catch (err) {
        startNofification(err.message);
      }
    }
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

        sessionStorage.setItem("walletConnected", "true");

        // console.log("З якого кошиля плачу:", response.publicKey.toString());
        return response.publicKey;
      } catch (err) {
        startNofification(err.message);
      }
    }
  };

  const checkIfWalletIsConnected = async () => {
    const prov = getProvider();
    const walletConnected = sessionStorage.getItem("walletConnected");
    if (prov && walletConnected === "true") {
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

    // baseStore
    const baseStore = useBaseStore();
    const { loader } = storeToRefs(baseStore);

    // console.log("На який кошильок плачу", receiverPublicKeyString);
    const provider = getProvider();
    if (!provider) return;

    //from
    const senderPublicKey = await connectWallet();
    // to
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
      loader.value = false;
      startNofification(err.message);
    }
  };

  return {
    isConnected,
    solanaAdres,
    connectWallet,
    disconnectWallet,
    payBySolana,
    checkIfWalletIsConnected,
  };
});
