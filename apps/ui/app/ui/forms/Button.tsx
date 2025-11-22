import { ButtonHTMLAttributes, ReactElement } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonType = ReactElement<ButtonProps>;

export const Button = ({
  children,
  className,
  ...buttonProps
}: ButtonProps): ButtonType => {
  return (
    <button className={`btn ${className}`} {...buttonProps}>
      {children}
    </button>
  );
};
