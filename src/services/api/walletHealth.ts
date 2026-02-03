import { APIResponse } from '../../types/api';
import { CONFIG } from '../../config';

class WalletHealthService {
  async checkWallet(address: string, isPremium: boolean = false): Promise<APIResponse> {
    // Call Next.js API route
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, isPremium }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw new Error('Failed to fetch wallet health data');
    }
  }

  private mockResponse(address: string, isPremium: boolean): APIResponse {
    const baseResponse: APIResponse = {
      address,
      score: isPremium ? 68 : 72,
      checks: [
        {
          check_name: 'assets',
          risk_found: false,
          risk_level: 'MEDIUM',
          score_penalty: 0,
          details: isPremium ? 'Stable assets: 98.7%, volatile assets: 1.3%' : '',
          raw_data: isPremium
            ? [
                {
                  address: '0x0000000000000000000000000000000000000000',
                  addressURL: 'https://etherscan.io/address/0x0000000000000000000000000000000000000000',
                  name: 'Ethereum',
                  symbol: 'ETH',
                  balance: 0.44421531364255357,
                  usd_value: 888.4306272851071,
                  is_stable: false,
                },
              ]
            : [],
        },
        {
          check_name: 'dead_nft',
          risk_found: true,
          risk_level: 'LOW',
          score_penalty: 10,
          details: '',
          raw_data: isPremium
            ? [
                '0x0a8d311b99ddaa9ebb45fd606eb0a1533004f26b:0x0000000000000000000000000000000000000000000000000000000000000216',
              ]
            : [],
        },
        {
          check_name: 'scam_tokens',
          risk_found: true,
          risk_level: 'HIGH',
          score_penalty: 20,
          details: '',
          raw_data: isPremium
            ? [
                '0x0000000000a39bb272e79075ade125fd351887ac',
              ]
            : [],
        },
        {
          check_name: 'approvals',
          risk_found: true,
          risk_level: 'HIGH',
          score_penalty: 40,
          details: isPremium ? 'Found 4 risky approvals' : '',
          raw_data: isPremium
            ? [
                {
                  token_address: '0x6b175474e89094c44da98b954eedeac495271d0f',
                  token_url: 'https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f',
                  token_name: 'Dai Stablecoin',
                  spender_address: '0xc92e8bdf79f0507f65a392b0ab4667716bfe0110',
                  spender_url: 'https://etherscan.io/address/0xc92e8bdf79f0507f65a392b0ab4667716bfe0110',
                  approved_amount: '',
                  exposure_balance: 0,
                  is_unlimited: true,
                  is_malicious: false,
                },
              ]
            : [],
        },
      ],
    };

    return baseResponse;
  }
}

export const walletHealthService = new WalletHealthService();
