import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RISK_LEVELS } from '../../config';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BadgeVariant = 'default' | 'outline' | 'success' | 'warning' | 'danger';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const Badge = ({
  className,
  variant = 'default',
  riskLevel,
  ...props
}: BadgeProps) => {
  let variantClasses = '';

  if (riskLevel) {
    const riskConfig = RISK_LEVELS[riskLevel];
    variantClasses = cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      riskConfig.bgColor,
      riskConfig.color
    );
  } else {
    const variantStyles = {
      default: 'inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium',
      outline: 'inline-flex items-center rounded-full border border-input bg-background px-2.5 py-0.5 text-xs font-medium',
      success: 'inline-flex items-center rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium',
      warning: 'inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 px-2.5 py-0.5 text-xs font-medium',
      danger: 'inline-flex items-center rounded-full bg-red-100 text-red-800 px-2.5 py-0.5 text-xs font-medium',
    };
    variantClasses = variantStyles[variant];
  }

  return (
    <div className={cn(variantClasses, className)} {...props} />
  );
};
