import { MenuItemProps } from '@ui/menu/types';
import { cloneElement, isValidElement, ReactElement, useMemo } from 'react';

type LinkProps = MenuItemProps & {
  onClick: () => void;
  children: ReactElement<{ className: string }> | string;
};
export const Link = ({ size, tooltip, onClick, children }: LinkProps) => {
  const icon = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(children, {
        className: `${children.props.className} h-${size}`,
      });
    }
    return children;
  }, [children, size]);
  return (
    <div className={`tooltip`} data-tip={tooltip} onClick={onClick}>
      {icon}
    </div>
  );
};
