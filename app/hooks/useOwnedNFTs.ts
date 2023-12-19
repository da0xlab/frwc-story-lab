import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";

type NFT = OwnedNft & { owner: string };
type NFTsByContract = Record<string, NFT[]>;

const config = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

async function fetchTokensByContract(
  wallets: string[],
  contractAddresses: string[] | undefined
) {
  // Get tokens for each wallet, and sort by contract
  let tokensByContract: NFTsByContract = {};
  for (var wallet of wallets) {
    const nfts = await alchemy.nft.getNftsForOwner(wallet, {
      contractAddresses,
    });
    nfts.ownedNfts.forEach((nft) => {
      if (tokensByContract[nft.contract.address]) {
        tokensByContract[nft.contract.address].push({ ...nft, owner: wallet });
      } else {
        tokensByContract[nft.contract.address] = [{ ...nft, owner: wallet }];
      }
    });
  }
  // Sort collections by tokenId
  for (const contract in tokensByContract) {
    tokensByContract[contract] = tokensByContract[contract]?.sort((a, b) =>
      parseInt(a.tokenId) < parseInt(b.tokenId) ? -1 : 1
    );
  }
  return tokensByContract;
}

function useOwnedNFTs(
  ownerAddresses: string[],
  contractAddresses: string[] | undefined
) {
  const [tokens, setTokens] = useState<NFTsByContract>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNFTs() {
      setLoading(true);
      const data = await fetchTokensByContract(
        ownerAddresses,
        contractAddresses
      );
      setTokens(data);
      setLoading(false);
    }
    getNFTs();
  }, [ownerAddresses, contractAddresses]);

  return { tokens, isLoading: loading };
}

export default useOwnedNFTs;
