import { ReactElement, ReactNode } from 'react';

type ContentProps = { children: string | ReactNode };
type TitleProps = { children: string };

export const Title = ({ children }: TitleProps): TitleType => (
  <h3 className="font-bold text-lg">{children}</h3>
);

export const Content = ({ children }: ContentProps): ContentType => {
  return <p className="py-4">{children}</p>;
};

export type TitleType = ReactElement<TitleProps>;
export type ContentType = ReactElement<ContentProps>;
