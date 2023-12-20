import { OwnedNft } from "alchemy-sdk";
import styled from "styled-components";
import NFTItem from "./NFTItem";

const NFTCollection = ({
  itemWidth,
  nfts,
}: {
  itemWidth: number;
  nfts: OwnedNft[];
}) => {
  return (
    <>
      {nfts.length > 0 && (
        <Grid>
          {nfts?.map((t) => {
            return Array.from(Array(t.balance)).map(() => (
              <NFTItem
                nft={t}
                key={`${t.contract.address}-${t.tokenId}`}
                width={itemWidth}
              />
            ));
          })}
        </Grid>
      )}
    </>
  );
};

export default NFTCollection;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 1em;
`;
