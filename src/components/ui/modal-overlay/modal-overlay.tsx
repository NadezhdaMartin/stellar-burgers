import { FC } from 'react';
import { ModalOverlayUIProps } from './types';
import styles from './modal-overlay.module.css';

export const ModalOverlayUI: FC<ModalOverlayUIProps> = ({
  onClick,
  dataCyOverlay
}) => (
  <div className={styles.overlay} onClick={onClick} data-cy={dataCyOverlay} />
);
