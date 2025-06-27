use anchor_lang::prelude::*;

declare_id!("EuXtguR5S8nPqBMZNg3qMMCVjN53u4obRbwQL5zzB8xQ");

#[program]
pub mod anchor_lottery {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
