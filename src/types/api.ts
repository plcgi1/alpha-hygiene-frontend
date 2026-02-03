export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Asset {
  address: string;
  addressURL: string;
  name: string;
  symbol: string;
  balance: number;
  usd_value: number;
  is_stable: boolean;
}

export interface Approval {
  token_address: string;
  token_url: string;
  token_name: string;
  spender_address: string;
  spender_url: string;
  approved_amount: string;
  exposure_balance: number;
  is_unlimited: boolean;
  is_malicious: boolean;
}

export interface CheckResult {
  check_name: string;
  risk_found: boolean;
  risk_level: RiskLevel;
  score_penalty: number;
  details: string;
  raw_data: Asset[] | string[] | Approval[];
}

export interface APIResponse {
  address: string;
  score: number;
  checks: CheckResult[];
}
