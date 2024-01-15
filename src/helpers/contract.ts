import { ethers } from "ethers";
import contractABI from "./abis/abi.json";
import { ENVS } from "./configurations/index";
import axios from "axios";

// Contract can be used to read Contract
const getContractWithoutSigner = () => {
  const infuraProvider = new ethers.providers.EtherscanProvider(
    ENVS.CHAIN_ID,
    "FS1XPCIUBGE4YGSE2CPC1Z1MJPMZ5D23RS"
  );
  const contract = new ethers.Contract(
    ENVS.CONTRACT_ADDRESS,
    contractABI,
    infuraProvider
  );

  return contract;
};

// Get Current Total Supply from the Contract
export const getCurrentTotalSupply = async () => {
  const contract = getContractWithoutSigner();
  try {
    let totalSupply = await contract.totalSupply();
    return parseInt(totalSupply) / 1e18;
  } catch (err) {
    return 0;
  }
};

// Get Max Element Counts from the Contract
export const getCirculatedSupply = async () => {
  const contract = getContractWithoutSigner();
  try {
    let circulatingSupply = await contract.getCirculatingSupply();
    return parseInt(circulatingSupply) / 1e18;
  } catch (err) {
    return 0;
  }
};

// Get Max Element Counts from the Contract
export const getBurnedSupply = async () => {
  const contract = getContractWithoutSigner();
  try {
    let burnSupply = await contract.getBurnedSupply();
    return parseInt(burnSupply) / 1e18;
  } catch (err) {
    return 0;
  }
};

// Get Max Element Counts from the Contract
export const getTokenName = async () => {
  const contract = getContractWithoutSigner();
  try {
    let name = await contract.name();
    return name;
  } catch (err) {
    return 0;
  }
};

// Get Max Element Counts from the Contract
export const getTokenSymbol = async () => {
  const contract = getContractWithoutSigner();
  try {
    let symbol = await contract.symbol();
    return symbol;
  } catch (err) {
    return 0;
  }
};

// Get Max Element Counts from the Contract
export const getReflections = async () => {
  const contract = getContractWithoutSigner();
  try {
    let total = await contract._reflectionTotal();
    return parseInt(total) / 1e18;
  } catch (err) {
    return 0;
  }
};

// Get Max Element Counts from the Contract
export const getLpEth = async () => {
  const contract = getContractWithoutSigner();
  try {
    let total = await contract._lpAddedTotal();
    return parseInt(total) / 1e18;
  } catch (err) {
    return 0;
  }
};

export const getMarketingEth = async () => {
  try {
    const infuraProvider = new ethers.providers.EtherscanProvider(
      ENVS.CHAIN_ID,
      "FS1XPCIUBGE4YGSE2CPC1Z1MJPMZ5D23RS"
    );
    const balance = await infuraProvider.getBalance(ENVS.MARKETING_ADDRESS);
    return parseFloat(ethers.utils.formatEther(balance));
  } catch (err) {
    console.log(err);
    return 0;
  }
};


export const getTrimmedToken = async (address: string) => {
  try {
    const contract = getContractWithoutSigner();
    var amountIn = await contract.balanceOf(address);
    return parseInt(amountIn) / 1e18;
  } catch (err) {
    console.log(err);
    return 0;
  }
};


export const getMarketingToken = async () => {
  try {
    const contract = getContractWithoutSigner();
    var amountIn = await contract.balanceOf(ENVS.MARKETING_ADDRESS);
    return parseInt(amountIn) / 1e18;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getEthprice = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    return res.data.ethereum.usd;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getTokenPrice = async () => {
  try {
    const infuraProvider = new ethers.providers.EtherscanProvider(
      ENVS.CHAIN_ID,
      "FS1XPCIUBGE4YGSE2CPC1Z1MJPMZ5D23RS"
    );
    const uniswapRouter = new ethers.Contract(
      ENVS.ROUTER_ADDRESS,
      [
        "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
      ],
      infuraProvider
    );

    const path = [ENVS.CONTRACT_ADDRESS, ENVS.ETH_ADDRESS];
    const amounts = await uniswapRouter.getAmountsOut(
      ethers.utils.parseEther("1"),
      path
    );
    const price = amounts[1] / amounts[0];
    const ethPrice = await getEthprice();
    const usd = price * ethPrice;

    return usd;
  } catch (err) {
    return 0;
  }
};
