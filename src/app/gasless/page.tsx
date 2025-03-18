"use client";
import type React from "react";
import { claimTo, getNFT, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import {
  ConnectButton,
  MediaRenderer,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import {
  accountAbstraction,
  client,
  editionDropContract,
  editionDropTokenId,
} from "../constants";
import Link from "next/link";

const GaslessHome: React.FC = () => {
  const smartAccount = useActiveAccount();
  const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
    contract: editionDropContract,
    tokenId: editionDropTokenId,
  });
  const { data: ownedNfts } = useReadContract(getOwnedNFTs, {
    contract: editionDropContract,
    address: smartAccount?.address!,
    queryOptions: { enabled: !!smartAccount },
  });
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
        Sponsored Transactions
      </h1>
      <ConnectButton
        client={client}
        accountAbstraction={accountAbstraction}
        connectModal={{
          size: "compact",
        }}
      />

      <Link href={"/"} className="text-sm text-gray-400 mt-8">
        Back to menu
      </Link>
    </div>
  );
};

export default GaslessHome;
