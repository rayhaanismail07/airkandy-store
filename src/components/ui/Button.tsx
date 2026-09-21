import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'gold' | 'cyan' | 'pink' | 'lime' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variantStyles: Record<string, string> = {
      // Woodmart-primary: teal fill
      primary: 'bg-ak-teal text-white hover:bg-ak-teal-dark border border-ak-teal',
      // Woodmart-outline: teal border
      outline: 'bg-white text-ak-teal border border-ak-teal hover:bg-ak-teal hover:text-white',
      // Gold accent
      gold:    'bg-ak-gold text-wd-gray900 hover:bg-ak-gold-dark border border-ak-gold',
      // Ghost
      ghost:   'bg-transparent text-wd-gray700 hover:bg-ak-warm hover:text-ak-teal border border-transparent',
      // Legacy aliases (for components not yet migrated)
      cyan:    'bg-ak-teal text-white hover:bg-ak-teal-dark border border-ak-teal',
      pink:    'bg-red-500 text-white hover:bg-red-600 border border-red-500',
      lime:    'bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600',
      glass:   'bg-white/90 text-wd-gray900 hover:bg-white border border-gray-200 shadow-wd-card',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'text-xs px-4 py-2    gap-1.5',
      md: 'text-sm px-5 py-2.5  gap-2',
      lg: 'text-sm px-7 py-3    gap-2',
      xl: 'text-base px-8 py-4  gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center select-none font-semibold uppercase tracking-wide transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant] ?? variantStyles.primary,
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className,
        )}
        style={{ borderRadius: 2 }}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1.5 text-current" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
