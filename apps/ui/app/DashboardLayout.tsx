import { useAuthentication } from './api/authentication';
import { Outlet } from 'react-router';
import { CenterLayout } from '@ui/layout/centerLayout';
import { Menu } from '@ui/menu';
import { FaTools, FaUser } from 'react-icons/fa';
import { Modal } from '@ui/modal';
import { useRef } from 'react';
import { Button } from '@ui/forms/Button';
import { ModalApi } from '@ui/modal/Modal';

export const DashboardLayout = () => {
  const { isLoading, user, logout } = useAuthentication();
  const modal = useRef<ModalApi>(null);
  const askForLogout = () => {
    modal.current?.show();
  };

  const goToGithub = () => {
    window.open(
      'https://github.com/ksojecki/recepturomat-water-management',
      '_blank'
    );
  };
  if (isLoading) return null;
  return (
    <>
      <CenterLayout>
        <Outlet />
      </CenterLayout>
      <Menu size={5}>
        <Menu.Link tooltip="Source code" onClick={goToGithub}>
          Source code
        </Menu.Link>
        {user && (
          <Menu.Link tooltip="Logout" onClick={askForLogout}>
            <FaUser />
          </Menu.Link>
        )}
        {user && (
          <Menu.Link tooltip="Settings" onClick={askForLogout}>
            <FaTools />
          </Menu.Link>
        )}
        <Menu.ToggleTheme tooltip={'Change theme'} />
      </Menu>
      <Modal api={modal}>
        <Modal.Title>Log out</Modal.Title>
        <Modal.Content>Do you want to logout?</Modal.Content>
        <Button onClick={logout} className="btn-primary">
          Yes
        </Button>
        <Button>No</Button>
      </Modal>
    </>
  );
};
