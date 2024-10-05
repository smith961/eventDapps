import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const fs = require("fs");

const LockModule = buildModule("LockModule", (m) => {
  const owner = m.getParameter(
    "owner",
    "0xF2E7E2f51D7C9eEa9B0313C2eCa12f8e43bd1855"
  );
  const _paymentToken = m.getParameter(
    "_paymentToken",
    "0x94b38F87880912aa4F46b4A7631315B933f67A2c"
  );
  const nftAddress = m.getParameter(
    "nftAddress",
    "0x442576ef8EA93B6aA30cb7C779b8cC1e402bca5e"
  );

  const lock = m.contract("Ventura", [owner, _paymentToken, nftAddress]);

  return { lock };
});

export default LockModule;

//Owner: 0xF2E7E2f51D7C9eEa9B0313C2eCa12f8e43bd1855
//StableToken: 0x94b38F87880912aa4F46b4A7631315B933f67A2c
//VenturaTokens: 0x442576ef8EA93B6aA30cb7C779b8cC1e402bca5e
//Ventura: 0xBbcD22fd30EFA3c859f3C30a7224aB257D20b112
