import React from 'react';
interface BotaoComandaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'success' | 'danger' | 'warning' | 'outline-light';
  children: React.ReactNode;
}

export function BotaoComanda({ variant, children, className = '', ...props }: BotaoComandaProps) {
  const variantClass = `btn-${variant}`;
  
  const textClass = variant === 'warning' ? 'text-dark border-0' : '';

  return (
    <button
      className={`btn ${variantClass} ${textClass} fw-bold d-flex align-items-center justify-content-center gap-1 shadow-sm ${className}`}
      style={{ 
        height: '44px', 
        fontSize: '0.9rem', 
        borderRadius: '6px' 
      }}
      {...props}
    >
      {children}
    </button>
  );
}