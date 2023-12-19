import { NftContractForNft } from "alchemy-sdk";
import { useGalleryContext } from "../contexts/GalleryContext";
import styled from "styled-components";

function WalletsPicker({ addresses }: { addresses: string[] }) {
  const { wallets, setWallets } = useGalleryContext();

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
      {addresses.map((a) => {
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
