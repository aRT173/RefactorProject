import {DefaultOptionType} from "antd/es/select";

type Value = DefaultOptionType["value"]

export const getOptionValues = (options: DefaultOptionType[] = []) =>
  options.reduce<Value[]>((values, option) => {
    const currentOptions = option.options ?? [option];

    currentOptions.forEach(({value}: { value: Value }) => {
      if (value != null)
        values.push(value);
    });

    return values;
  }, []);