import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'gold' | 'cyan' | 'blue' | 'pink' | 'lime' | 'purple' | 'amber' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'md',
  className,
  glow = false,
}) => {
  const variantStyles: Record<string, string> = {
    // Primary brand variants
    teal:    'bg-ak-teal text-white border-ak-teal',
    gold:    'bg-ak-gold text-wd-gray900 border-ak-gold',
    // Semantic variants (light style)
    cyan:    'bg-teal-50 text-ak-teal border-ak-teal/30',
    blue:    'bg-blue-50 text-blue-700 border-blue-200',
    pink:    'bg-red-50 text-red-600 border-red-200',
    lime:    'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple:  'bg-purple-50 text-purple-700 border-purple-200',
    amber:   'bg-amber-50 text-amber-700 border-amber-200',
    dark:    'bg-wd-gray800 text-white border-wd-gray700',
    outline: 'bg-white text-wd-gray700 border-gray-300',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'text-[10px] px-2 py-0.5 font-bold tracking-wider uppercase',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 font-bold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 border transition-all duration-200',
        variantStyles[variant] ?? variantStyles.teal,
        sizeStyles[size],
        className,
      )}
      style={{ borderRadius: 2 }}
    >
      {children}
    </span>
  );
};
