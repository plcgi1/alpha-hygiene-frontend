import React, { useState, useEffect } from 'react';
import { useWalletCheck } from './hooks/useWalletCheck';
import { WalletInputForm } from './components/wallet-check/WalletInputForm';
import { ReportView } from './components/wallet-check/ReportView';
import { Card, CardContent, CardHeader } from './components/common/Card';
import { CONFIG } from './config';
import { paymentService } from './services/api/payment';
import { useTelegram } from './hooks/useTelegram';
import { useLocalStorage } from 'usehooks-ts'
import './globals.css';

export default function Home() {
  const { isLoading, data, error, checkWallet, reset } = useWalletCheck();
  const [isPremium, setIsPremium] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { isTwa, tg } = useTelegram();
  const [address, setAddress, removeAddress] = useLocalStorage<string>('address', '')
  // Если в localStorage уже лежит GUID, он сразу окажется в orderGuid
  const [orderGuid, setOrderGuid, removeOrderGuid] = useLocalStorage<string | null>('orderGuid', null);

  // обработчик сбоев - если при платеже был сетевой сбой - оплата записана - а отчет не получили
  useEffect(() => {
    const checkRecovery = async () => {
      if (!orderGuid || !address) return;
      if (orderGuid === '' || address === '') return;
    
      try {
        const response = await paymentService.getPaymentStatus(orderGuid);
        if (response.status === 'paid') {
          await checkWallet(address, orderGuid);
          // removeOrderGuid()
          // removeAddress()
        }
      } catch (e) {
        console.log("Сессия истекла или не найдена");
        // removeOrderGuid()
        // removeAddress()
      }
    };
    checkRecovery();
  }, []);

  const handleCheckWallet = async (address: string, premium: boolean = false) => {
    setIsPremium(premium);
    await checkWallet(address, orderGuid || '');
  };
  
  const handleBackToInput = () => {
    reset();
    setIsPremium(false);
  };

  function startPolling(orderId: string, inputAddress: string) {
    setIsChecking(true);
    const pollingInterval = setInterval(async () => {
      try {
        const response = await paymentService.getPaymentStatus(orderId);
        if (response.status === 'paid') {
          clearInterval(pollingInterval);
          setIsChecking(false);
          await checkWallet(inputAddress, orderId);
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000);
  }

  async function onPaymentSubmit(inputAddress: string) {
    if (isChecking) return;
    try {
      const invoiceResponse = await paymentService.createInvoice(inputAddress);
      const { orderUrl, orderId } = invoiceResponse
      setOrderGuid(orderId)
      setAddress(inputAddress)
      // Открываем платежную ссылку (если API её возвращает)
      if (orderUrl && (isTwa && tg?.openInvoice)) {
        startPolling(orderId, inputAddress);
        tg.openInvoice(orderUrl, (status: string) => {
          console.info('status', status)
          // TODO тут рефакторить
          switch (status) {
            case 'paid':
              console.info('paid', status)
              setIsChecking(false);
              // removeOrderGuid()
              // removeAddress()
              break;
            case 'cancelled':
              console.info('cancelled', status)
              // Сюда попадаем, если нажали "Закрыть"
              // Вебхук на сервер НЕ отправляется
              // забьем эту тему - руками проверю если что
              alert('Payment cancelled');
              setIsChecking(false);
              // removeOrderGuid()
              // removeAddress()
              break;
            case 'failed':
              console.info('failed', status)
              alert('Payment failed');
              setIsChecking(false);
              // removeOrderGuid()
              // removeAddress()
              break;
            default:
              console.info('default', status)
              break;      
          }          
        });
      }
    } catch (e) {
      console.error('Error:', e);
      setIsChecking(false);
    }
  }
 
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {CONFIG.APP_NAME}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Analyze your cryptocurrency wallet hygiene and security
          </p>
        </div>

        {!data ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Check Your Wallet
              </h2>
              <p className="text-gray-600">
                Enter your Ethereum wallet address to analyze its health
              </p>
            </CardHeader>
            <CardContent>
              <WalletInputForm
                onSubmit={handleCheckWallet}
                onPaymentSubmit={onPaymentSubmit}
                isLoading={isLoading}
                isChecking={isChecking}
              />
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <ReportView
            data={data}
            isPremium={isPremium}
            onBack={handleBackToInput}
          />
        )}
      </div>
    </main>
  );
}
