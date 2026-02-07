import { useAuthentication } from './api/authentication';
import { Outlet } from 'react-router';
import { Menu } from '@ui/menu';
import { FaTools, FaUser } from 'react-icons/fa';
import { Modal } from '@ui/modal';
import { useRef } from 'react';
import { Button } from '@ui/forms/Button';
import { ModalApi } from '@ui/modal/Modal';
import { useTranslation } from './i18n';

export const DashboardLayout = () => {
  const { isLoading, user, logout } = useAuthentication();
  const modal = useRef<ModalApi>(null);
  const t = useTranslation();

  const askForLogout = () => {
    modal.current?.show();
  };

  const goToGithub = () => {
    window.open('https://github.com/ksojecki/recepturomat', '_blank');
  };
  if (isLoading) return null;
  return (
    <>
      <Outlet />
      <Menu size={5}>
        <Menu.Link tooltip={t('menu.sourceCode')} onClick={goToGithub}>
          {t('menu.sourceCode')}
        </Menu.Link>
        {user && (
          <Menu.Link tooltip={t('menu.logout')} onClick={askForLogout}>
            <FaUser />
          </Menu.Link>
        )}
        {user && (
          <Menu.Link tooltip={t('menu.settings')} onClick={askForLogout}>
            <FaTools />
          </Menu.Link>
        )}
        <Menu.ToggleTheme tooltip={t('menu.changeTheme')} />
      </Menu>
      <Modal api={modal}>
        <Modal.Title>{t('auth.logout')}</Modal.Title>
        <Modal.Content>{t('auth.logoutConfirm')}</Modal.Content>
        <Button onClick={logout} className="btn-primary">
          {t('common.yes')}
        </Button>
        <Button>{t('common.no')}</Button>
      </Modal>
    </>
  );
};
