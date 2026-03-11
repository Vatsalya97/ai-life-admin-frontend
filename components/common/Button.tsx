import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({
  children,
  variant = 'primary',
  style,
  ...props
}: ButtonProps) {
  const backgroundColor =
    variant === 'primary' ? '#111827' : variant === 'danger' ? '#b91c1c' : '#ffffff';

  const color = variant === 'secondary' ? '#111827' : '#ffffff';
  const border = variant === 'secondary' ? '1px solid #d1d5db' : '1px solid transparent';

  return (
    <button
      {...props}
      style={{
        backgroundColor,
        color,
        border,
        padding: '10px 14px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 600,
        ...style
      }}
    >
      {children}
    </button>
  );
}