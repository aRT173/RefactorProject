import React, { useState } from 'react';
import type { SelectProps } from "antd";
import { Arrow, Container, Description, Label, Select as StyledSelect, SelectDropdownStyles } from "./styles";
import { DefaultOptionType } from "antd/es/select";
import { getOptionValues } from "./utils";

export type SelectPropsBase = Omit<
  SelectProps,
  "disabled" | "mode" | "onOpenChange" | "open" | "showSearch"
> & Partial<{
  label: string;
  allowSearch: boolean;
  required: boolean;
  woRedStar: boolean;
  disabled: boolean;
  multiple: boolean;
  allowEmpty: boolean;
  placeholder: string;
  description: string;
}>

export const SelectBase = (props: SelectPropsBase) => {
  const {
    label,
    placeholder = "Не выбрано", // TODO: add i18n
    description,
    allowSearch = false,
    required = false,
    woRedStar = false,
    disabled = false,
    multiple = false,
    allowEmpty = false,
    optionFilterProp,
    options,
    onChange,
    defaultValue,
    ...selectProps
  } = props
  const [opened, setOpened] = useState<boolean>(false)
  const [value, setValue] = useState<SelectProps["value"]>(defaultValue)

  const handleChange = (value: SelectProps["value"], option?: DefaultOptionType) => {
    setValue(value);
    onChange?.(value, option);
  };

  const renderEmptyOption = (menu: React.ReactElement) => (
    <>
      <div
        className="ant-select-item ant-select-item-option ant-select-item-option-grouped"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          const resetValue = multiple ? [] : undefined;

          setValue(resetValue);
          onChange?.(resetValue, undefined);
          setOpened(false);
        }}
      >
        Не выбрано
      </div>

      {menu}
    </>
  )

  const renderSelectAll = (menu: React.ReactElement) => {
    if (!multiple) {
      return menu;
    }

    return (
      <>
        <div
          className="ant-select-item ant-select-item-option ant-select-item-option-grouped"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            const optionValues = getOptionValues(options);
            const values = optionValues.length > value.length ? optionValues : [];

            setValue(values);

            onChange?.(optionValues, undefined);
            setOpened(false);
          }}
        >
          Выбрать все
        </div>

        {menu}
      </>
    );
  };

  const renderPopup = (menu: React.ReactElement) => {
    if (multiple)
      return renderSelectAll(menu);

    if (allowEmpty && !multiple)
      return renderEmptyOption(menu);

    return <></>
  }

  return (
    <Container>
      <SelectDropdownStyles/>
      {label ? <Label $required={required} $woRedStar={woRedStar}>{label}</Label> : null}
      <StyledSelect
        {...selectProps}
        placeholder={placeholder}
        showSearch={allowSearch}
        disabled={disabled}
        mode={multiple ? "multiple" : undefined}
        open={opened}
        options={options}
        value={value}
        popupRender={renderPopup}
        onChange={handleChange}
        onOpenChange={setOpened}
        suffixIcon={<Arrow isOpen={opened}/>}
        optionFilterProp={optionFilterProp || 'label'}
        dropdownClassName='select-dropdown'
      />
      {description != null ? <Description>{description}</Description> : null}
    </Container>
  );
};
