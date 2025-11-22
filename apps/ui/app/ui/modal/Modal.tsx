import { RefObject, useLayoutEffect, useRef } from 'react';
import { ContentType, TitleType } from '@ui/modal/Content';
import { ButtonType } from '@ui/forms/Button';

export type ModalApi = {
  show: () => void;
};

export type ModalProps = {
  children: [TitleType, ContentType, ...ButtonType[]];
  api: RefObject<ModalApi | null>;
};

export const Modal = ({ api, children }: ModalProps) => {
  const modal = useRef<HTMLDialogElement | null>(null);
  useLayoutEffect(() => {
    api.current = {
      show: () => {
        modal.current?.showModal();
      },
    };
  }, [api]);

  const [title, content, ...buttons] = children;

  return (
    <dialog className="modal" ref={modal}>
      <div className="modal-box">
        {title}
        {content}
        <div className="modal-action flex">
          <form method="dialog" className="flex flex-row gap-2">
            {buttons.map((button) => button)}
          </form>
        </div>
      </div>
    </dialog>
  );
};
