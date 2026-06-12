import React, {useCallback, useState} from 'react';
import {Input, InputContainer} from "../styles";
import {CityItem} from "../List";

type SearchProps = {
  items : CityItem[];
  setLoading: (value: boolean) => void;
  setFilteredItems: (cityItems: CityItem[]) => void;
}

export const Search = (props: SearchProps) => {
  const {items, setFilteredItems, setLoading} = props

  const [inputValue, setInputValue] = useState("");

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      setLoading(true)

      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredItems(filtered);
      setLoading(false)
    },
    [items],
  );

  return (
    <InputContainer>
      <Input
        id="cityName"
        value={inputValue}
        placeholder="Type city name"
        onChange={onInputChange}
      />
    </InputContainer>
  );
};
