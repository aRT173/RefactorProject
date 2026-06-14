import { Button, Input, Select } from "antd";
import { ReactElement, useCallback, useState } from "react";
import { FiltersContainer } from "./styles";
import { CityItem } from "../List";

type Filter = {
  filterName: keyof CityItem;
  value?: number;
};

type FiltersProps = {
  items: CityItem[];
  setLoading: (value: boolean) => void;
  setFilteredItems: (cityItems: CityItem[]) => void;
};

export function Filters({
  items,
  setFilteredItems,
  setLoading,
}: FiltersProps): ReactElement {
  const [floorFilter, setFloorFilter] = useState<Filter>({
    filterName: "floor",
    value: undefined,
  });
  const [roomsFilter, setRoomsFilter] = useState<Filter>({
    filterName: "roomsNumber",
    value: undefined,
  });
  const [ratingFilter, setRatingFilter] = useState<Filter>({
    filterName: "rating",
    value: undefined,
  });

  const onFiltersApply = useCallback(() => {
    setLoading(true);

    const appliedFilters = [floorFilter, roomsFilter, ratingFilter].filter(
      ({ value }) => value !== undefined,
    );

    console.log(appliedFilters);

    const filtered = items.filter((item) =>
      appliedFilters.every(
        ({ filterName, value: filterValue }) =>
          item[filterName] === filterValue,
      ),
    );

    setFilteredItems(filtered);
    setLoading(false);
  }, [items, floorFilter, roomsFilter, ratingFilter]);

  return (
    <FiltersContainer>
      <Input
        id="floor"
        value={floorFilter.value}
        placeholder="Floor"
        onChange={(value) =>
          setFloorFilter({
            filterName: "floor",
            value: Number(value.target.value),
          })
        }
      />
      <Input
        id="rooms"
        value={roomsFilter.value}
        placeholder="Rooms"
        allowClear
        onChange={(value) =>
          setRoomsFilter({
            filterName: "roomsNumber",
            value: Number(value.target.value),
          })
        }
      />
      <Select
        value={ratingFilter.value}
        allowClear
        placeholder="Rating"
        onChange={(value) =>
          setRatingFilter({
            filterName: "rating",
            value,
          })
        }
        options={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
          { value: 4, label: "4" },
          { value: 5, label: "5" },
        ]}
      />
      <Button onClick={onFiltersApply}>Apply filters</Button>
    </FiltersContainer>
  );
}
