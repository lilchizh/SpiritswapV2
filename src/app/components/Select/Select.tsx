import React, { FC, useCallback } from 'react';
import { Props } from './Select.d';
import { StyledContainer, StyledHeading, StyledItem } from './styles';

const Select: FC<Props> = ({
  labels = [],
  selected = 0,
  disabled = false,
  onChange,
  children,
  ...props
}: Props) => {
  const clickHandler = useCallback(
    index => {
      if (!disabled) {
        onChange?.({ index, value: labels[index] });
      }
    },
    [disabled, onChange, labels],
  );

  return (
    <StyledContainer disabled={disabled} {...props}>
      {labels.map((label, index) => {
        const itemProps = {
          key: `select-${index}`,
          $active: index === selected,
          disabled: disabled,
          $last: index === labels.length - 1,
          onClick: () => clickHandler(index),
          $component: typeof label === 'object',
        };

        if (typeof label === 'string') {
          return (
            <StyledHeading level={4} {...itemProps}>
              {label}
            </StyledHeading>
          );
        }

        return <StyledItem {...itemProps}>{label}</StyledItem>;
      })}
      {children}
    </StyledContainer>
  );
};

export default Select;
