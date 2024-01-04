import { NftContractForNft } from "alchemy-sdk";
import { useGalleryContext } from "../../contexts/GalleryContext";
import styled from "styled-components";
import { useState } from "react";
import useSavedWallets from "@/app/hooks/useSavedWallets";

function WalletsPicker() {
  const { selectedWallets, setSelectedWallets, allWallets, setAllWallets } =
    useGalleryContext();
  const { removeWallet } = useSavedWallets();

  function handleOnChange(address: string) {
    if (selectedWallets.includes(address)) {
      setSelectedWallets(selectedWallets.filter((a) => a !== address));
    } else {
      setSelectedWallets([...selectedWallets, address]);
    }
  }

  function handleRemove(address: string) {
    setSelectedWallets(selectedWallets.filter((a) => a !== address));
    setAllWallets(allWallets.filter((a) => a !== address));
    removeWallet(address);
  }

  return (
    <Container>
      <h3>Wallets:</h3>
      {allWallets.map((a) => {
        return (
          <label key={a}>
            <input
              type="checkbox"
              checked={selectedWallets.includes(a)}
              onChange={() => {
                handleOnChange(a);
              }}
            />
            {a}
            <button
              onClick={() => {
                handleRemove(a);
              }}
            >
              remove
            </button>
          </label>
        );
      })}
      <AddressInput />
    </Container>
  );
}

export default WalletsPicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const AddressInput = () => {
  const { allWallets, setAllWallets, selectedWallets, setSelectedWallets } =
    useGalleryContext();
  const { saveWallet } = useSavedWallets();

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);

  function validate(e: any) {
    const addr = e.target.value;
    setAddress(addr);
    // setValidAddress(ethers.utils.isAddress(addr))
    setValidAddress(!allWallets.includes(addr));
  }

  function addAddress() {
    const safeAddr = address.trimEnd();    
    saveWallet(safeAddr);
    setAllWallets([...allWallets, safeAddr]);
    setSelectedWallets([...selectedWallets, safeAddr]);
  }

  return (
    <>
      <TextInput
        required
        value={address}
        onChange={validate}
        minLength={42}
        maxLength={42}
        placeholder="Add wallet address..."
      />

      <button onClick={addAddress} disabled={!validAddress}>
        Add
      </button>
    </>
  );
};

export const TextInput = styled.input`
  width: 100%;
`;
