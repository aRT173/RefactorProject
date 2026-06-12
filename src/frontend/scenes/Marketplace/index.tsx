import React, {ReactElement, useEffect, useState} from "react";
import {CityItem, List} from "./List";
import {Loader} from "./Loader";
import {Search} from "./Search";

export function Marketplace(): ReactElement {
  const [items, setItems] = useState<CityItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getFilms = async () => {
      setLoading(true)

      const data = await (await fetch(`${process.env.REACT_APP_API_URL}/city-items`, {
        method: "GET",
      })).json()

      setItems(data.items)
      setFilteredItems(data.items)

      setLoading(false)
    };

    getFilms();
  }, []);

  return (
    <>
      <Search
        items={items}
        setLoading={setLoading}
        setFilteredItems={setFilteredItems}
      />
      {loading ? <Loader /> : <List items={filteredItems}/>}
    </>
  );
}
