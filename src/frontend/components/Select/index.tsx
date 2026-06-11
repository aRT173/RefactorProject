import React from 'react';
import {SelectBase, SelectPropsBase} from "../SelectBase";
import {BackendGroup, mapSelectGroup} from "../helpers";

type SelectProps =
  {
    options: BackendGroup[],
    attribute?: string,
    saveField?: (attribute: string, value: string) => void
    onChange?: (attribute: string, value: string) => void
  } & SelectPropsBase;

export const Select = (props: SelectProps) => {
  const {options, attribute, saveField, onChange, ...otherProps} = props

  const handleChange = (value: string) => {
    if (!attribute)
       return;

    saveField?.(attribute, value);
    onChange?.(attribute, value);
  }

  const preparedOptions = mapSelectGroup(options, {
    groupLabelKey: "title",
    groupOptionsKey: "types",
    optionValueKey: "value",
    optionLabelKey: "label",
    optionSortKey: "sort",
  });

  return (
    <SelectBase
      onChange={handleChange}
      options={preparedOptions}
      {...otherProps}
    />
  );
};
