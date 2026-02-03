import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface WalletInputFormProps {
  onSubmit: (address: string, isPremium: boolean) => void;
  isLoading: boolean;
}

export const WalletInputForm: React.FC<WalletInputFormProps> = ({ onSubmit, isLoading }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr.trim());
  };

  const handleFreeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress(address)) {
      setError('Please enter a valid Ethereum address');
      return;
    }
    setError(null);
    onSubmit(address, false);
  };

  const handlePremiumCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress(address)) {
      setError('Please enter a valid Ethereum address');
      return;
    }
    setError(null);
    onSubmit(address, true);
  };

  return (
    <form className="space-y-4">
      <Input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Wallet address is required"
        className="w-full font-mono text-sm"
        error={error}
        disabled={isLoading}
        spellCheck={false}
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          onClick={handleFreeCheck}
          disabled={!address || isLoading}
          className="flex-1"
        >
          {isLoading ? "loading" : 'Check for Free'}
        </Button>
        <Button
          type="submit"
          onClick={handlePremiumCheck}
          disabled={!address || isLoading}
          variant="premium"
          className="flex-1"
        >
          {isLoading ? "loading" : 'Get Full Report ($5)'}
        </Button>
      </div>
    </form>
  );
};
