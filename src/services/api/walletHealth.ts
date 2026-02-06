import { APIResponse } from '../../types/api';
import { CONFIG } from '../../config';

class WalletHealthService {
  async checkWallet(address: string, orderId: string): Promise<APIResponse> {
    // Call Next.js API route
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.CHECK_PAYMENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, orderId }),
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
}

export const walletHealthService = new WalletHealthService();
