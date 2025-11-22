import { cloneElement, isValidElement, useMemo } from 'react';
import { MenuItem } from '@ui/menu/types';

export type MenuProps = { size: number; children: (MenuItem | undefined)[] };
export const Menu = ({ size, children }: MenuProps) => {
  const menuEntries = useMemo(
    () =>
      children.map((item) => {
        if (isValidElement(item)) {
          return (
            <li key={item.props.tooltip}>{cloneElement(item, { size })}</li>
          );
        }
        return item;
      }),
    [children, size]
  );
  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6 fixed bottom-8 right-8">
      {menuEntries}
    </ul>
  );
};
