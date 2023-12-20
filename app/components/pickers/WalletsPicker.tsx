import { NftContractForNft } from "alchemy-sdk";
import { useGalleryContext } from "../../contexts/GalleryContext";
import styled from "styled-components";
import { useState } from "react";

function WalletsPicker() {
  const { selectedWallets: wallets, allWallets, setSelectedWallets: setWallets } = useGalleryContext();

  function handleOnChange(address: string) {
    if (wallets.includes(address)) {
      setWallets(wallets.filter((a) => a !== address));
    } else {
      setWallets([...wallets, address]);
    }
  }

  return (
    <Container>
      <h3>Wallets:</h3>
      {allWallets.map((a) => {
        return (
          <label key={a}>
            <input
              type="checkbox"
              checked={wallets.includes(a)}
              onChange={() => {
                handleOnChange(a);
              }}
            />
            {a}
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
  const { allWallets, setAllWallets, selectedWallets: wallets, setSelectedWallets: setWallets } = useGalleryContext();

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);

  function validate(e: any) {
    const addr = e.target.value;
    setAddress(addr);
    // setValidAddress(ethers.utils.isAddress(addr))
    setValidAddress(!allWallets.includes(addr));
  }

  function addAddress() {
    setAllWallets([...allWallets, address]);
    setWallets([...wallets, address]);
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