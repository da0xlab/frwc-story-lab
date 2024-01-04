import { useEffect, useState } from "react";

const localStorageKey = "NFTGalleryStore";

const saveWalletsToLocalStorage = ({ addresses }: { addresses: string[] }) => {
  localStorage.setItem(localStorageKey, JSON.stringify(addresses));
};

const getWalletsFromLocalStorage = (): string[] => {
  const item = localStorage.getItem(localStorageKey);
  if (item) {
    try {
      return JSON.parse(item);
    } catch {}
  }
  return [];
};

export default function useStoredWallets() {
  const [savedWallets, setSavedWallets] = useState<string[]>([]);

  function saveWallet(address: string) {
    const addresses = getWalletsFromLocalStorage();
    addresses.push(address);
    saveWalletsToLocalStorage({ addresses });
  }

  function removeWallet(address: string) {
    const addresses = getWalletsFromLocalStorage().filter((a) => a !== address);
    saveWalletsToLocalStorage({ addresses });
  }

  useEffect(() => {
    setSavedWallets(getWalletsFromLocalStorage());
  }, []);

  return { savedWallets, saveWallet, removeWallet };
}
