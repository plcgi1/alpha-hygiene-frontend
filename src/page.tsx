import React, { useState } from 'react';
import { useWalletCheck } from './hooks/useWalletCheck';
import { WalletInputForm } from './components/wallet-check/WalletInputForm';
import { ReportView } from './components/wallet-check/ReportView';
import { Card, CardContent, CardHeader } from './components/common/Card';
import { CONFIG } from './config';
import './globals.css';

export default function Home() {
  const [isPremium, setIsPremium] = useState(false);
  const { isLoading, data, error, checkWallet, reset } = useWalletCheck();

  const handleCheckWallet = async (address: string, premium: boolean) => {
    setIsPremium(premium);
    await checkWallet(address, premium);
  };
  const handleBackToInput = () => {
    reset();
  };

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
                isLoading={isLoading}
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
