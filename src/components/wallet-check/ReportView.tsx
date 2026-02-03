import React from 'react';
import { ScoreCard } from './ScoreCard';
import { CheckList } from './CheckList';
import { Card, CardContent, CardHeader } from '../common/Card';
import { Button } from '../common/Button';
import type { APIResponse } from '../../types/api';

interface ReportViewProps {
  data: APIResponse;
  isPremium: boolean;
  locale: string;
  onBack: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  data,
  isPremium,
  locale,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Wallet Health Report</h1>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back to Input
        </Button>
      </div>

      {!isPremium && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Get Full Report with Details
            </h3>
            <p className="text-sm text-gray-600">
              Unlock detailed information about all detected risks and actionable recommendations
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">$5</p>
                <p className="text-sm text-gray-600">
                  One-time payment
                  </p>
              </div>
              <Button variant="premium" size="lg">
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ScoreCard data={data} locale={locale} />

      <CheckList
        checks={data.checks}
        locale={locale}
        title="Risk Analysis"
      />

      {!isPremium && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Get Full Report with Details
            </h3>
            <p className="text-sm text-gray-600">
              Unlock detailed information about all detected risks and actionable recommendations
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">$5</p>
                <p className="text-sm text-gray-600">
                  One-time payment
                </p>
              </div>
              <Button variant="premium" size="lg">
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-500 mt-1">⚠️</div>
            <div>
              <h4 className="font-semibold text-sm text-gray-800">Disclaimer</h4>
              <p className="text-xs text-gray-600 mt-1">
                This report provides general information only and should not be considered financial advice.
                Always do your own research before making any decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
