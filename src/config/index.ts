const apiUrl = import.meta.env.VITE_API_URL || ''

// Main configuration
export const CONFIG = {
  APP_NAME: 'Alpha Hygiene',
  API_BASE_URL: apiUrl,
  API_ENDPOINTS: {
    CHECK_WALLET: '/api/v1/check-wallet',
    GET_REPORT: '/api/v1/get-report'
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
    PRICE: 5, // USD
    CURRENCY: 'USDC',
    DURATION: '24h'
  }
};

// Risk Level Definitions
export const RISK_LEVELS = {
  LOW: {
    label: { en: 'Low Risk', ru: 'Низкий риск' },
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    icon: '✅'
  },
  MEDIUM: {
    label: { en: 'Medium Risk', ru: 'Средний риск' },
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    icon: '⚠️'
  },
  HIGH: {
    label: { en: 'High Risk', ru: 'Высокий риск' },
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    icon: '🚨'
  }
};

// Check Names and Display Config
export const CHECK_CONFIG = {
  assets: {
    title: { en: 'Asset Distribution', ru: 'Распределение активов' },
    description: { en: 'Stable vs volatile assets', ru: 'Стабильные vs волатильные активы' },
    icon: '💰'
  },
  dead_nft: {
    title: { en: 'Dead NFTs', ru: 'Мертвые NFT' },
    description: { en: 'Non-transferable or useless NFTs', ru: 'Непередаваемые или бесполезные NFT' },
    icon: '🎨'
  },
  scam_tokens: {
    title: { en: 'Scam Tokens', ru: 'Мошеннические токены' },
    description: { en: 'Known malicious tokens', ru: 'Известные вредные токены' },
    icon: '🚫'
  },
  approvals: {
    title: { en: 'Risky Approvals', ru: 'Рискные разрешения' },
    description: { en: 'Dangerous token approvals', ru: 'Опасные разрешения для токенов' },
    icon: '🔐'
  }
};

// UI Messages
export const MESSAGES: Record<string, Record<string, string>> = {
  analizeYour: {
    en: 'Analyze your cryptocurrency wallet hygiene and security',
    ru: 'Проанализируйте состояние и безопасность вашего криптовалютного кошелька'
  },
  // Input validation
  invalidAddress: { en: 'Please enter a valid Ethereum address', ru: 'Пожалуйста, введите действительный адрес Ethereum' },
  requiredAddress: { en: 'Wallet address is required', ru: 'Адрес кошелька обязателен' },
  
  // API responses
  loading: { en: 'Analyzing wallet health...', ru: 'Анализ здоровья кошелька...' },
  success: { en: 'Wallet check completed', ru: 'Проверка кошелька завершена' },
  error: { en: 'Failed to check wallet health', ru: 'Не удалось проверить здоровье кошелька' },
  premiumRequired: { en: 'Full report requires premium access', ru: 'Полный отчет требует премиум-доступ' },
  
  // Score messages
  scoreIntro: { en: 'Your Wallet Nutrition Score:', ru: 'Ваш балл здоровья кошелька:' },
  scoreImprovement: { en: 'Improve by {action}', ru: 'Улучшите, {action}' },
  
  // Action items
  revokeApprovals: { en: 'revoking old approvals', ru: 'отозвав старые разрешения' },
  removeScamTokens: { en: 'removing scam tokens', ru: 'удалив мошеннические токены' },
  mintNFTs: { en: 'avoiding suspicious NFTs', ru: 'избегая подозрительных NFT' },
  
  // Premium messages
  getFullReport: { en: 'Get Full Report with Details', ru: 'Получить полный отчет с деталями' },
  unlockDetails: { en: 'Unlock detailed information about all detected risks and actionable recommendations', ru: 'Разблокируйте детальную информацию о всех обнаруженных рисках и рекомендуемых действиях' },
  oneTimePayment: { en: 'One-time payment', ru: 'Однократный платеж' },
  upgradeToPremium: { en: 'Upgrade to Premium', ru: 'Оплатить' }
};
