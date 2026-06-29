import {CityItem} from "../List";

export type FiltersType = {
  name?: string;
  floor?: number;
  roomsNumber?: number;
  rating?: number;
};

type FilterValue = string | number | undefined;

type NumberFilter = keyof Pick<CityItem, "floor" | "roomsNumber" | "rating">

export type FiltersMapItem = {
  filterName: keyof FiltersType;
  searchParamName: string;
  parse: (value: string | null) => FilterValue;
  match: (item: CityItem, value: FilterValue) => boolean;
};

export const ratingOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
]

const parseNumber = (value: string | null) =>
  value ? Number(value) : undefined;

const parseString = (value: string | null) =>
  value || undefined;

const matchNumberFilter =
  (fieldName: NumberFilter) =>
    (item: CityItem, value: FilterValue) => {
      if (value === undefined || typeof value !== "number") return true;

      return item[fieldName] === value;
    };

export const filtersMap: FiltersMapItem[] = [
  {
    filterName: "name",
    searchParamName: "name",
    parse: parseString,
    match: (item, value) => {
      if (!value || typeof value !== "string") return true;

      return item.name.toLowerCase().includes(value.toLowerCase());
    }
  },
  {
    filterName: "floor",
    searchParamName: "floor",
    parse: parseNumber,
    match: matchNumberFilter('floor'),
  },
  {
    filterName: "roomsNumber",
    searchParamName: "rooms",
    parse: parseNumber,
    match: matchNumberFilter('roomsNumber'),
  },
  {
    filterName: "rating",
    searchParamName: "rating",
    parse: parseNumber,
    match: matchNumberFilter('rating'),
  },
];

export const getInputFilterValue = (value: string) => value ? Number(value) : undefined;