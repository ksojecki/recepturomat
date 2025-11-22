import { ReactNode } from 'react';

type CenterLayoutProps = { children: ReactNode };

export const CenterLayout = ({ children }: CenterLayoutProps) => (
  <div className="h-dvh overflow-scroll">
    <div className=" h-[100%] p-4 content-center">{children}</div>
  </div>
);
