import React from 'react';
import { CheckItem } from './CheckItem';
import { Card, CardContent, CardHeader } from '../common/Card';
import type { CheckResult } from '../../types/api';

interface CheckListProps {
  checks: CheckResult[];
  locale: string;
  title?: string;
}

export const CheckList: React.FC<CheckListProps> = ({
  checks,
  locale = 'en',
  title,
}) => {
  if (checks.length === 0) {
    return null;
  }

  const highRiskChecks = checks.filter((check) => check.risk_level === 'HIGH');
  const mediumRiskChecks = checks.filter((check) => check.risk_level === 'MEDIUM');
  const lowRiskChecks = checks.filter((check) => check.risk_level === 'LOW');

  const sortedChecks = [...highRiskChecks, ...mediumRiskChecks, ...lowRiskChecks];

  return (
    <Card className="w-full">
      {title && (
        <CardHeader className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {title}
          </h3>
        </CardHeader>
      )}
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {sortedChecks.map((check, index) => (
            <CheckItem key={index} check={check} locale={locale} />
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">High Risk</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Low Risk</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
