import { Button, Input, Select } from "antd";
import { ReactElement, useCallback, useState, ChangeEvent, useEffect } from "react";
import {FiltersContainer, Search} from "./styles";
import { CityItem } from "../List";
import { useSearchParams } from 'react-router-dom';
import {FiltersType, filtersMap, FiltersMapItem, getInputFilterValue, ratingOptions} from "./utils";

type FiltersProps = {
  items: CityItem[];
  setFilteredItems: (cityItems: CityItem[]) => void;
};

export function Filters({
  items,
  setFilteredItems,
}: FiltersProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  const initFilters = (filtersMap: FiltersMapItem[]) => filtersMap.reduce<FiltersType>(
    (acc, {filterName, searchParamName, parse}) => ({
      ...acc,
      [filterName]: parse(searchParams.get(searchParamName)),
    }),
    {},
  )

  const [filters, setFilters] = useState<FiltersType>(initFilters(filtersMap))

  const onFiltersApply = useCallback(() => {
    const filtered = items.filter((item) =>
      filtersMap.every(({filterName, match}) => (match(item, filters[filterName]))),
    );

    setFilteredItems(filtered);
  }, [filters, items, setFilteredItems]);

  useEffect(() => {
    if (!items) return

    onFiltersApply()
    // NOTE: Warning about onFiltersApply. I didn't add it to stick to the correct apply button logic
    // eslint-disable-next-line
  }, [items]);

  const handleFilterChange = (
    filterName: keyof FiltersType,
    searchParamName: string,
    value?: number | string,
  ) => {
    setFilters(prev => ({...prev, [filterName]: value}))
    setSearchParams(prev => {
      if (!value) prev.delete(searchParamName);
      else prev.set(searchParamName, String(value));

      return prev
    })
  }

  const handleInputFilterChange = (
    filterName: keyof FiltersType,
    searchParamName: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => handleFilterChange(
    filterName,
    searchParamName,
    getInputFilterValue(event.target.value),
  )

  return (
    <>
      <Search
        id="name"
        value={filters.name}
        placeholder="Type city name"
        onChange={(event) => handleFilterChange('name', 'name', event.target.value)}
      />
      <FiltersContainer>
        <Input
          id="floor"
          value={filters.floor}
          placeholder="Floor"
          onChange={handleInputFilterChange('floor', 'floor')}
        />
        <Input
          id="rooms"
          value={filters.roomsNumber}
          placeholder="Rooms"
          allowClear
          onChange={handleInputFilterChange('roomsNumber', 'rooms')}
        />
        <Select
          value={filters.rating}
          allowClear
          placeholder="Rating"
          onChange={(value) => handleFilterChange('rating', 'rating', value)}
          options={ratingOptions}
        />
        <Button onClick={onFiltersApply}>Apply filters</Button>
      </FiltersContainer>
    </>
  );
}
