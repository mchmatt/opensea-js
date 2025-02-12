import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { BigNumber } from "ethers";
import { OpenSeaAccount, OpenSeaAssetBundle } from "../types";

// Protocol data
type OrderProtocolToProtocolData = {
  seaport: OrderWithCounter;
};
export type OrderProtocol = keyof OrderProtocolToProtocolData;
export type ProtocolData =
  OrderProtocolToProtocolData[keyof OrderProtocolToProtocolData];

// Protocol agnostic order data
type OrderType = "basic" | "dutch" | "english" | "criteria";
export type OrderSide = "ask" | "bid";
type OrderFee = {
  account: OpenSeaAccount;
  basisPoints: string;
};

/**
 * The latest OpenSea Order schema.
 */
export type OrderV2 = {
  /** The date the order was created. */
  createdDate: string;
  /** The date the order was closed. */
  closingDate: string | null;
  /** The date the order was listed. Order can be created before the listing time. */
  listingTime: number;
  /** The date the order expires. */
  expirationTime: number;
  /** The hash of the order. */
  orderHash: string | null;
  /** The account that created the order. */
  maker: OpenSeaAccount;
  /** The account that filled the order. */
  taker: OpenSeaAccount | null;
  /** The protocol data for the order. Only 'seaport' is currently supported. */
  protocolData: ProtocolData;
  /** The contract address of the protocol. */
  protocolAddress: string;
  /** The current price of the order. */
  currentPrice: BigNumber;
  /** The maker fees for the order. */
  makerFees: OrderFee[];
  /** The taker fees for the order. */
  takerFees: OrderFee[];
  /** The side of the order. Ask/Bid */
  side: OrderSide;
  /** The type of the order. Basic/Dutch/English/Criteria */
  orderType: OrderType;
  /** Whether or not the maker has cancelled the order. */
  cancelled: boolean;
  /** Whether or not the order is finalized. */
  finalized: boolean;
  /** Whether or not the order is marked invalid and therefore not fillable. */
  markedInvalid: boolean;
  /** The signature the order is signed with. */
  clientSignature: string | null;
  /** Bundle of assets from the maker. */
  makerAssetBundle: OpenSeaAssetBundle;
  /** Bundle of assets from the taker. */
  takerAssetBundle: OpenSeaAssetBundle;
  /** Amount of items left in the order which can be taken. */
  remainingQuantity: number;
};

export type FulfillmentDataResponse = {
  protocol: string;
  fulfillment_data: FulfillmentData;
};

type FulfillmentData = {
  transaction: Transaction;
  orders: ProtocolData[];
};

type Transaction = {
  function: string;
  chain: number;
  to: string;
  value: number;
  input_data: object;
};

// API query types
type OpenOrderOrderingOption = "created_date" | "eth_price";
type OrderByDirection = "asc" | "desc";

export type OrderAPIOptions = {
  protocol?: OrderProtocol;
  protocolAddress?: string;
  side: OrderSide;
};

export type OrdersQueryOptions = OrderAPIOptions & {
  limit: number;
  cursor?: string;

  paymentTokenAddress?: string;
  maker?: string;
  taker?: string;
  owner?: string;
  bundled?: boolean;
  includeBundled?: boolean;
  listedAfter?: number | string;
  listedBefore?: number | string;
  tokenId?: string;
  tokenIds?: string[];
  assetContractAddress?: string;
  orderBy?: OpenOrderOrderingOption;
  orderDirection?: OrderByDirection;
  onlyEnglish?: boolean;
};

export type SerializedOrderV2 = {
  created_date: string;
  closing_date: string | null;
  listing_time: number;
  expiration_time: number;
  order_hash: string | null;
  maker: unknown;
  taker: unknown | null;
  protocol_data: ProtocolData;
  protocol_address: string;
  current_price: string;
  maker_fees: {
    account: unknown;
    basis_points: string;
  }[];
  taker_fees: {
    account: unknown;
    basis_points: string;
  }[];
  side: OrderSide;
  order_type: OrderType;
  cancelled: boolean;
  finalized: boolean;
  marked_invalid: boolean;
  client_signature: string | null;
  maker_asset_bundle: unknown;
  taker_asset_bundle: unknown;
  remaining_quantity: number;
};

export type QueryCursors = {
  next: string | null;
  previous: string | null;
};

export type OrdersQueryResponse = QueryCursors & {
  orders: SerializedOrderV2[];
};

export type OrdersPostQueryResponse = { order: SerializedOrderV2 };
