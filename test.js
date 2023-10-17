import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BadgeToken", function () {

    async function deployBadgeTokenFixture() {  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();

      const BadgeToken = await ethers.getContractFactory("BadgeToken");
      const token = await BadgeToken.deploy('BadgeToken','Badge');

      return { token, owner, otherAccount };
    }

    describe("Deployment", function () {
      it("Should has the correct name and symbol", async function () {
        const { token, owner } = await loadFixture(deployBadgeTokenFixture);
        const total = await token.balanceOf(owner.address);
        expect(total).to.equal(0);
        expect(await token.name()).to.equal('BadgeToken');
        expect(await token.symbol()).to.equal('Badge');
      });
    });

    describe("Mint NFT", function () {
      it("Should mint a token with token ID 1 & 2 to account1", async function () {
        const { token, owner, otherAccount } = await loadFixture(deployBadgeTokenFixture);

        const address1=otherAccount.address;
        await token.mintTo(address1);
        expect(await token.ownerOf(1)).to.equal(address1);

        await token.mintTo(address1);
        expect(await token.ownerOf(2)).to.equal(address1);

        expect(await token.balanceOf(address1)).to.equal(2);      
      });  
    });
});
