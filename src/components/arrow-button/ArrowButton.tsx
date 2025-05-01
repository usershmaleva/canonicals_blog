import { FC } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface Props {
  isOpen: boolean;
  onClick: OnClick;
}

export const ArrowButton: FC<Props> = ({ isOpen, onClick }) => (
  <div
    role="button"
    aria-label="Открыть/Закрыть форму параметров статьи"
    tabIndex={0}
    onClick={onClick}
    className={clsx(styles.container, { [styles.container_open]: isOpen })}
  >
    <img
      src={arrow}
      alt="иконка стрелочки"
      className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
    />
  </div>
);

export default ArrowButton;


