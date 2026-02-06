import React from 'react';
import { Card, CardContent, CardHeader } from '../common/Card';
import { Badge } from '../common/Badge';
import type { APIResponse } from '../../types/api';

interface ScoreCardProps {
  data: APIResponse;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreDescription = (score: number): string => {
    if (score >= 80) {
      return 'Excellent wallet health! Keep up the good work.';
    }
    if (score >= 60) {
      return 'Good wallet health! There\'s room for improvement.';
    }
    if (score >= 40) {
      return 'Average wallet health. Consider addressing the risks.';
    }
    return 'Poor wallet health. Urgent action is recommended.';
  };

  const getActionItem = (data: APIResponse): string => {
    const highRiskChecks = data.checks.filter((check) => check.risk_level === 'HIGH');
    
    if (highRiskChecks.some((check) => check.check_name === 'approvals')) {
      return 'revoking old approvals';
    }
    if (highRiskChecks.some((check) => check.check_name === 'scam_tokens')) {
      return 'removing scam tokens';
    }
    if (highRiskChecks.some((check) => check.check_name === 'dead_nft')) {
      return 'avoiding suspicious NFTs';
    }
    
    return 'revoking old approvals';
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader className="text-center pb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Wallet Nutrition Score:
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <div className={`text-5xl font-bold ${getScoreColor(data.score)}`}>
            {data.score}
          </div>
          <div className="text-2xl font-semibold text-gray-600">/100</div>
        </div>
        <div className="mt-4">
          <Badge
            riskLevel={data.score >= 80 ? 'LOW' : data.score >= 60 ? 'MEDIUM' : 'HIGH'}
            className="text-sm px-3 py-1"
          >
            {data.score >= 80 ? 'Excellent' : data.score >= 60 ? 'Good' : 'Poor'} Health
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-700 mb-4">
          {getScoreDescription(data.score)}
        </p>
        <p className="text-gray-600 font-medium">
          Improve by {getActionItem(data)}
        </p>
      </CardContent>
    </Card>
  );
};
