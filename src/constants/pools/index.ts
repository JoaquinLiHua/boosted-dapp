import {
  yfiToken,
  sushiToken,
  bandToken,
  kncToken,
  compToken,
  linkToken,
  lendToken,
  snxToken,
  mkrToken,
  renToken,
  uniswapLPToken,
  uniswapBoostToken,
  yfiBoostToken,
  creamBoostToken,
  sushiBoostToken,
  usdcBoostToken,
  usdcToken,
  creamToken,
  uniToken,
  wethToken,
} from "src/constants/tokenAddresses";

// Wave 1 Pool Addresses
export const compPool = "0x39CD2Fc7BAc954ABc3C1b6dA1CD467fA44f4f3BD";
export const mkrPool = "0x40aFeF1b846D0a4EEf601Cf2B2117468eF63643C";
export const lendPool = "0x383F3Ba9B39011f658e55a4c24c648851A4A8b60";
export const snxPool = "0xf8Cb70658F7eC2bdC51d65323300b4cd0B5c6301";
export const kncPool = "0x90dfbaDDf8f213185004bB200eDbB554E1F13D52";
export const renPool = "0x1dfF57d28C30F094235f0244939194B1223e66e1";
export const yfiPool = "0x3EE27441449B2DfC705E3C237FFd75826870120A";
export const linkPool = "0x57fbd512a440CCE6832c62fD63c54A0A9f545F8a";
export const bandPool = "0x3080869CF796d944cB4fb3C47D7084f8E8D3d22a";
export const sushiPool = "0xC7491fcDfc8af10d5a8Bc9C13b60B85209C0dc59";

// Wave 2 Pool Addresses
export const uniswapPool = "0x8851d9b6c913309225947dda16e82e1854198c1e";

// Wave 3 Pool Addresses
export const uniswapPoolV2 = "0x115b9f50f6a13c70792737e2c2990e7b7ac5ea28";
export const yfiBoostPool = "0x06281eb6014bED89bD9f252f72796a6cbe7349d8";
export const usdcBoostPool = "0x80128f108922482C5d2dfe745AF1d89D7Cf39BDC";
export const creamBoostPool = "0x32C21af450d9905151e9cE28a430d4FDAb11b261";
export const sushiBoostPool = "0xDf1731418e1f8bF2FE336732355d35917aFD9267";
export const uniBoostPool = "0xfb4468f90991a7b4e9af7ef33e5603d8ea99f2ad";

export const ALL_POOLS = [
  {
    name: "BOOST-ETH (Uniswap BOOST-ETH)",
    code: "boost_pool",
    order: 0,
    icon: "/images/boost-icon.png",
    address: uniswapPool,
    tokenContract: uniswapLPToken,
    tokenTicker: "boost-eth-lp",
    open: false,
  },
  {
    name: "Yearn Alpha (YFI)",
    code: "yfi_pool",
    order: 0,
    icon: "/images/yfi-icon.png",
    address: yfiPool,
    tokenContract: yfiToken,
    tokenTicker: "yfi",
    open: false,
  },
  {
    name: "Omakase (SUSHI)",
    code: "eth_pool",
    order: 1,
    icon: "/images/sushi-icon.png",
    address: sushiPool,
    tokenContract: sushiToken,
    tokenTicker: "sushi",
    open: false,
  },
  {
    name: "Band Wagons (BAND)",
    code: "band_pool",
    order: 2,
    icon: "/images/band-icon.svg",
    address: bandPool,
    tokenContract: bandToken,
    tokenTicker: "band",
    open: false,
  },
  {
    name: "Kyber Corp (KNC)",
    code: "knc_pool",
    order: 3,
    icon: "/images/knc-logo.svg",
    address: kncPool,
    tokenContract: kncToken,
    tokenTicker: "knc",
    open: false,
  },
  {
    name: "Compound Soils (COMP)",
    code: "comp_pool",
    order: 4,
    icon: "/images/comp-logo.svg",
    address: compPool,
    tokenContract: compToken,
    tokenTicker: "comp",
    open: false,
  },
  {
    name: "Marine Corps (LINK)",
    code: "link_pool",
    order: 5,
    icon: "/images/link-logo.svg",
    address: linkPool,
    tokenContract: linkToken,
    tokenTicker: "link",
    open: false,
  },
  {
    name: "Aave Nauts (LEND)",
    code: "lend_pool",
    order: 6,
    icon: "/images/lend-logo.svg",
    address: lendPool,
    tokenContract: lendToken,
    tokenTicker: "lend",
    open: false,
  },
  {
    name: "Synth Spartans (SNX)",
    code: "snx_pool",
    order: 7,
    icon: "/images/snx-logo.svg",
    address: snxPool,
    tokenContract: snxToken,
    tokenTicker: "snx",
    open: false,
  },
  {
    name: "Maker Mountain (MKR)",
    code: "mkr_pool",
    order: 8,
    icon: "/images/mkr-logo.svg",
    address: mkrPool,
    tokenContract: mkrToken,
    tokenTicker: "mkr",
    open: false,
  },
  {
    name: "Ren Moon (REN)",
    code: "ren_pool",
    order: 8,
    icon: "/images/ren-logo.svg",
    address: renPool,
    tokenContract: renToken,
    tokenTicker: "ren",
    open: false,
  },
  {
    name: "Unicorn (UNI-BOOST)",
    code: "uni_boost_pool",
    order: 9,
    icon: "/images/uni-logo.png",
    address: uniBoostPool,
    tokenContract: uniswapBoostToken,
    tokenTicker: "uni-boost-blp",
    open: false,
    underlyingToken: uniToken,
    url:
      "https://pools.balancer.exchange/#/pool/0x004e74ff81239c8f2ec0e2815defb970f3754d86",
  },
  {
    name: "Wifey (YFI-BOOST)",
    code: "yfi_boost_pool",
    order: 10,
    icon: "/images/yfi-icon.png",
    address: yfiBoostPool,
    tokenContract: yfiBoostToken,
    tokenTicker: "yfi-boost-blp",
    open: false,
    underlyingToken: yfiToken,
    url:
      "https://pools.balancer.exchange/#/pool/0xd3a38eaeae085b04d4da3614c870c3b985067c40",
  },
  {
    name: "Creampie (CREAM-BOOST)",
    code: "cream_boost_pool",
    order: 11,
    icon: "/images/cream-logo.png",
    address: creamBoostPool,
    tokenContract: creamBoostToken,
    tokenTicker: "cream-boost-blp",
    open: false,
    underlyingToken: creamToken,
    url:
      "https://pools.balancer.exchange/#/pool/0xafd541e91b5bf792ae36f7ea1213c878e6feb1d3",
  },
  {
    name: "Sushi (SUSHI-BOOST)",
    code: "sushi_boost_pool",
    order: 12,
    icon: "/images/sushi-icon.png",
    address: sushiBoostPool,
    tokenContract: sushiBoostToken,
    tokenTicker: "sushi-boost-blp",
    open: false,
    underlyingToken: sushiToken,
    url:
      "https://pools.balancer.exchange/#/pool/0x53b0a526e67aec8f151297f8b6b20d0d8a7b9129",
  },
  {
    name: "Stability (USDC-BOOST)",
    code: "usdc_boost_pool",
    order: 13,
    icon: "/images/usdc-logo.png",
    address: usdcBoostPool,
    tokenContract: usdcBoostToken,
    tokenTicker: "usdc-boost-blp",
    open: false,
    underlyingToken: usdcToken,
    url:
      "https://pools.balancer.exchange/#/pool/0xc0f0ab9767ec5117cc640127255fad744ddc55b0",
  },
  {
    name: "OG (ETH-BOOST V2)",
    code: "eth_boost_v2_pool",
    order: 14,
    icon: "/images/boost-icon.png",
    address: uniswapPoolV2,
    tokenContract: uniswapLPToken,
    tokenTicker: "boost-eth-lp",
    open: false,
    underlyingToken: wethToken,
    url:
      "https://app.uniswap.org/#/add/ETH/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78",
  },
];
