import { initUserAuthData } from '../../hooks/useTelegram';
import { CONFIG } from '../../config';

export interface CreateInvoiceResponse {
  orderUrl: string;
  orderId: string;
}

export interface PaymentStatusResponse {
  status: 'paid' | 'pending';
}

export interface CheckPaymentRequest {
  address: string;
  orderId: string;
}

class PaymentService {
  async createInvoice(address: string): Promise<CreateInvoiceResponse> {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.CREATE_INVOICE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `twa ${initUserAuthData}`
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Create invoice error:', error);
      throw new Error('Failed to create payment invoice');
    }
  }

  async getPaymentStatus(guid: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.PAYMENT_STATUS}/${guid}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get payment status error:', error);
      throw new Error('Failed to get payment status');
    }
  }

  async checkPayment(data: CheckPaymentRequest) {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.CHECK_PAYMENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Check payment error:', error);
      throw new Error('Failed to check payment');
    }
  }

  // код от ИИ с косяком - каким? ответ знаю
  async pollPaymentStatus(guid: string, interval: number = 3000, timeout: number = 300000): Promise<PaymentStatusResponse> {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await this.getPaymentStatus(guid);
          
          if (status.status === 'paid') {
            resolve(status);
          } else if (Date.now() - startTime > timeout) {
            reject(new Error('Payment timeout'));
          } else {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  }
}

export const paymentService = new PaymentService();
