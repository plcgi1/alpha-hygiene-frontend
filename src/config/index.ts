const apiUrl = import.meta.env.VITE_API_URL || ''

// Main configuration
export const CONFIG = {
  APP_NAME: 'Alpha Hygiene',
  API_BASE_URL: apiUrl,
  API_ENDPOINTS: {
    CHECK_WALLET: '/api/v1/check-wallet',
    GET_REPORT: '/api/v1/get-report',
    CREATE_INVOICE: '/api/payment/create-invoice',
    PAYMENT_STATUS: '/api/payment-status',
    CHECK_PAYMENT: '/api/check'
  },
  BLOCK_EXPLORER: {
    BASE_URL: 'https://etherscan.io',
    ADDRESS_PATH: '/address',
    TX_PATH: '/tx'
  },
  CURRENCY: {
    SYMBOL: 'USD',
    DECIMALS: 2
  },
  SCORE: {
    MIN: 0,
    MAX: 100
  },
  PREMIUM: {
    PRICE: '300 ⭐', // STAR
    CURRENCY: 'USDC',
    DURATION: '24h'
  }
};

// Risk Level Definitions
export const RISK_LEVELS = {
  LOW: {
    label: 'Low Risk',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    icon: '✅'
  },
  MEDIUM: {
    label: 'Medium Risk',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    icon: '⚠️'
  },
  HIGH: {
    label: 'High Risk',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    icon: '🚨'
  }
};

// Check Names and Display Config
export const CHECK_CONFIG = {
  assets: {
    title: 'Asset Distribution',
    description: 'Stable vs volatile assets',
    icon: '💰'
  },
  dead_nft: {
    title: 'Dead NFTs',
    description: 'Non-transferable or useless NFTs',
    icon: '🎨'
  },
  scam_tokens: {
    title: 'Scam Tokens',
    description: 'Known malicious tokens',
    icon: '🚫'
  },
  approvals: {
    title: 'Risky Approvals',
    description: 'Dangerous token approvals',
    icon: '🔐'
  }
};
