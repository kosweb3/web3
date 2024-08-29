import { ref } from "vue";
import { ethers } from "ethers";

export const useStoreCryproPayment = defineStore("storeCryptoPayment", () => {
  const handleMetaMaskPayment = async (amountInEther) => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature!");
      return;
    }

    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Convert the amount from Ether to Wei (1 Ether = 10^18 Wei)
      const amountInWei = ethers.utils.parseEther(amountInEther.toString());

      // Send the transaction
      const tx = await signer.sendTransaction({
        to: "RECEIVER_WALLET_ADDRESS", // Replace with your receiving wallet address
        value: amountInWei,
      });

      // Wait for the transaction to be confirmed
      await tx.wait();

      console.log("Payment successful:", tx);

      // After successful payment, record the transaction in your database
      recordPaymentInDatabase({
        amount: amountInEther,
        transactionHash: tx.hash,
        paymentMethod: "MetaMask",
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  return { handleMetaMaskPayment };
});
