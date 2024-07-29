import { ref } from "vue";
import { defineStore } from "pinia";
import Web3 from "web3";

export const useStore = defineStore("connectWallet", () => {
  const account = ref(null);
  const balance = ref(0);
  const error = ref(null);

  const toggleWalletConnection = () => {
    if (account.value) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        account.value = accounts[0];
        getBalance(account.value);
      } catch (e) {
        error.value = "Failed to connect wallet";
      }
    } else {
      error.value = "MetaMask is not installed";
    }
  };

  const disconnectWallet = () => {
    account.value = null;
    balance.value = 0;
    error.value = null;
  };

  const getBalance = async (address) => {
    try {
      const weiBalance = await web3.eth.getBalance(address);
      balance.value = web3.utils.fromWei(weiBalance, "ether");
    } catch (e) {
      error.value = "Failed to fetch balance";
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        account.value = accounts[0];
        getBalance(account.value);
      }
    } else {
      error.value = "MetaMask is not installed";
    }
  };

  return {
    account,
    balance,
    error,
    toggleWalletConnection,
    connectWallet,
    disconnectWallet,
    getBalance,
    checkIfWalletIsConnected,
  };
});
