import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorLottery } from "../target/types/anchor_lottery";

describe("anchor-lottery", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchorLottery as Program<AnchorLottery>;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet as anchor.Wallet;


  it("should init config!", async () => {
    
    const initConfigIx = await program.methods.initialize(
      new anchor.BN(0),
      new anchor.BN(18751046925),
      new anchor.BN(10000)
    ).instruction();

    const blockhash = await provider.connection.getLatestBlockhash();

    const tx = new anchor.web3.Transaction({
      feePayer: wallet.publicKey,
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight
    }).add(initConfigIx);
    
    console.log("Your transaction signature", tx);

    const signature = await anchor.web3.sendAndConfirmTransaction(provider.connection,tx,[wallet.payer],{skipPreflight: true});
    console.log("Your transaction signature", signature);
  });
});
