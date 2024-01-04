import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";

export const warriorsAddress = "0x9690b63Eb85467BE5267A3603f770589Ab12Dc95";
export const wizardsAddress = "0x521f9C7505005CFA19A8E5786a9c3c9c9F5e6f42";
export const soulsAddress = "0x251b5F14A825C537ff788604eA1b58e49b70726f";
export const poniesAddress = "0xf55b615b479482440135ebf1b907fd4c37ed9420";
export const spawnAddress = "0x7de11a2d9e9727fa5ead3094e40211c5e9cf5857";
export const veilAddress = "0x31158181b4b91a423bfdc758fc3bf8735711f9c5";
export const ringsAddress = "0x5d4aa6ff9de7963ead5a17b454dc1093ca9e98e7";
export const athenaeumAddress = "0x7c104b4db94494688027cced1e2ebfb89642c80f";

export const defaultCollections = [
  wizardsAddress,
  warriorsAddress,
  soulsAddress,
  poniesAddress,
  spawnAddress,
  veilAddress,
  ringsAddress,
  athenaeumAddress,
];

export type NFT = OwnedNft & { owner: string };
export type Attribute = { trait_type: string; value: string };
export type NFTMetaData = {
  name: string;
  image: string;
  attributes: Attribute[];
};
export type NFTsByContract = Record<string, NFT[]>;

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
    let allNFTs: OwnedNft[] = [];
    let nfts = await alchemy.nft.getNftsForOwner(wallet, {
      contractAddresses,
    });
    allNFTs.push(...nfts.ownedNfts);
    while (nfts.pageKey) {
      nfts = await alchemy.nft.getNftsForOwner(wallet, {
        contractAddresses,
        pageKey: nfts.pageKey,
      });
      allNFTs.push(...nfts.ownedNfts);
    }
    allNFTs.forEach((nft) => {
      const ownedNFT = { ...nft, owner: wallet };
      if (tokensByContract[nft.contract.address]) {
        tokensByContract[nft.contract.address].push(ownedNFT);
      } else {
        tokensByContract[nft.contract.address] = [ownedNFT];
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
