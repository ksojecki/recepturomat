import { ReactElement } from 'react';

export type MenuItemProps = {
  size?: number;
  tooltip: string;
};

export type MenuItem = ReactElement<MenuItemProps>;
