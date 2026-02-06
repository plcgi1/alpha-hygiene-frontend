import React from 'react';
import { Card, CardContent, CardHeader } from '../common/Card';
import { Badge } from '../common/Badge';
import { CHECK_CONFIG, RISK_LEVELS } from '../../config';
import type { CheckResult } from '../../types/api';

interface CheckItemProps {
  check: CheckResult;
}

function getEtherscanURL(address: string): string {
  return `https://etherscan.io/address/${address}`
}

function getGoPlusUrl(address: string): string {
  return `https://console.gopluslabs.io/token-security/1/${address}`
}

function splitNftAndGetEtherscanURL(combination: string): string {
  const [address] = combination.split(':')
  return getEtherscanURL(address)
}

export const CheckItem: React.FC<CheckItemProps> = ({ check }) => {
  const config = CHECK_CONFIG[check.check_name as keyof typeof CHECK_CONFIG];
  const riskConfig = RISK_LEVELS[check.risk_level];

  const renderRawData = () => {
    if (check.check_name === 'assets') {
      return (
        <div className="mt-3 space-y-2">
          {check.raw_data.map((asset: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{asset.name}</span>
                <span className="text-sm text-gray-500">({asset.symbol})</span>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  ${asset.usd_value.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {asset.balance.toFixed(4)} {asset.symbol}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (check.check_name === 'approvals') {
      return (
        <div className="mt-3 space-y-2">
          {check.raw_data.map((approval: any, index: number) => (
            <div key={index} className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{approval.token_name}</span>
                </div>
                {approval.is_unlimited && (
                  <Badge variant="danger" className="text-xs">Unlimited</Badge>
                )}
              </div>
              <div className="mt-1 text-xs text-gray-600">
                <a href={getEtherscanURL(approval.spender_address)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Spender on Etherscan
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (check.check_name === 'dead_nft' || check.check_name === 'scam_tokens') {
      return (
        <div className="mt-3 space-y-1">
          {(check.raw_data as string[]).map((item: string, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-mono">
                <a href={splitNftAndGetEtherscanURL(item)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View on Etherscan
                </a>
              </span>
              { check.check_name === 'scam_tokens' && (
                <span className="text-sm font-mono">
                <a href={getGoPlusUrl(item)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View on GoPlus
                </a>
              </span>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="text-2xl">{config.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">
                {config.title}
              </h3>
              <p className="text-sm text-gray-500">
                {config.description}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Badge riskLevel={check.risk_level} className="text-sm">
              {riskConfig.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {check.details && (
          <p className="text-gray-700 mb-3">{check.details}</p>
        )}
        {check.score_penalty > 0 && (
          <p className="text-red-600 text-sm mb-3">
            Score Penalty: -{check.score_penalty} points
          </p>
        )}
        {check.risk_found && check.raw_data && check.raw_data.length > 0 && (
          <div className="border-t border-gray-200 pt-3">
            {renderRawData()}
          </div>
        )}
        {!check.risk_found && (
          <p className="text-green-600 text-sm">No risks detected</p>
        )}
      </CardContent>
    </Card>
  );
};
