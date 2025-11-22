import { InputHTMLAttributes } from 'react';

type SubmitProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const SubmitButton = (props: SubmitProps) => (
  <input type="submit" className="btn btn-primary" {...props} />
);
