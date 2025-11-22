import { MenuItemProps } from '@ui/menu/types';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ToggleTheme = ({
  size,
  tooltip,
}: Omit<MenuItemProps, 'onClick'>) => {
  return (
    <label className="swap swap-rotate tooltip" data-tip={tooltip}>
      <input type="checkbox" className="theme-controller" value="light" />
      <FaSun className={`swap-off h-${size} w-${size}`} />
      <FaMoon className={`swap-on h-${size} w-${size}`} />
    </label>
  );
};
