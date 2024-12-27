//index.js
import { http, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import { createBundlerClient } from "viem/account-abstraction";
import { account, client, RPC_URL } from "../../config/paymaster";
import { contractABI, contractAddress } from "../../abi/EstatePool";

// Example NFT Contract address. You will have to change this to your dapps address

const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http(RPC_URL),
  chain: baseSepolia,
});

export const OldCreateAsset = async (data: any) => {
  const userOperation = await bundlerClient.prepareUserOperation({
    calls: [
      {
        abi: contractABI,
        functionName: "CreateAsset",
        to: contractAddress,
        args: ["0xfCbb3Bd988705dD3eeB590769D60ad70819435a1"],
        value: parseEther("0.01"),
      },
    ],
    //paymaster: true,
  });

  try {
    console.log(account.address);
    userOperation.signature = await account.signUserOperation(userOperation);
    const userOpHash = await bundlerClient.sendUserOperation({
      ...userOperation,
    });

    const receipt = await bundlerClient.waitForUserOperationReceipt({
      hash: userOpHash,
    });
    return receipt.receipt.transactionHash;
  } catch (error) {
    console.log("Error sending transaction: ", error);
    process.exit(1);
  }
};


export const N
