import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  label?: string;
  type: 'email' | 'password' | 'text' | 'number' | 'tel' | 'url';
}

export const TextInput = ({
  type = 'text',
  isInvalid = false,
  className = '',
  label,
  ...props
}: TextInputProps) => {
  return (
    <label>
      <p className="text-sm mb-3">{label}</p>
      <input
        type={type}
        aria-invalid={isInvalid}
        className={`input validator ${className}`}
        {...props}
      />
    </label>
  );
};
