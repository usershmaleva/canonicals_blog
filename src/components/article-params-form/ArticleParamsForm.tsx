import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

import {
  backgroundColors,
  ArticleStateType,
  defaultArticleState,
  fontColors,
  contentWidthArr,
  fontSizeOptions,
  fontFamilyOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = ({ isOpen, onFormBtnClick, onFormSubmit }: {
  isOpen: boolean;
  onFormBtnClick: () => void;
  onFormSubmit: (state: ArticleStateType) => void;
}) => {
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && isOpen) {
        onFormBtnClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onFormBtnClick]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(formState);
  };

  const handleFormReset = (e: FormEvent) => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onFormSubmit(defaultArticleState);
  };

  const handleChange = <K extends keyof ArticleStateType>(field: K, value: ArticleStateType[K]) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onFormBtnClick} />
      <aside
        ref={formRef}
        className={clsx(styles.container, isOpen && styles.container_open)}
      >
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          onReset={handleFormReset}
        >
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Spacing size={50} />

          <Select
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            title="Шрифт"
            onChange={(value) => handleChange('fontFamilyOption', value)}
          />

          <Spacing size={50} />

          <RadioGroup
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            title="Размер шрифта"
            onChange={(value) => handleChange('fontSizeOption', value)}
          />

          <Spacing size={50} />

          <Select
            options={fontColors}
            selected={formState.fontColor}
            title="Цвет шрифта"
            onChange={(value) => handleChange('fontColor', value)}
          />

          <Spacing size={50} />

          <Separator />

          <Spacing size={50} />

          <Select
            options={backgroundColors}
            selected={formState.backgroundColor}
            title="Цвет фона"
            onChange={(value) => handleChange('backgroundColor', value)}
          />

          <Spacing size={50} />

          <Select
            options={contentWidthArr}
            selected={formState.contentWidth}
            title="Ширина контента"
            onChange={(value) => handleChange('contentWidth', value)}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
