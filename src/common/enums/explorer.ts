const BSC_EXPLORER = {
  PRODUCTION: 'https://bscscan.com/tx',
  DEV: 'https://testnet.bscscan.com/tx',
};

const ETH_EXPLORER = {
  PRODUCTION: 'https://etherscan.io/tx',
  DEV: 'https://ropsten.etherscan.io/tx',
};

const AVAL_EXPLORER = {
  PRODUCTION: 'https://snowtrace.io/tx',
  DEV: 'https://testnet.snowtrace.io/tx',
};

export enum EXPLORERS {
  BSC = BSC_EXPLORER[process.env.MODE],
  ETH = ETH_EXPLORER[process.env.MODE],
  AVAL = AVAL_EXPLORER[process.env.MODE],
}
