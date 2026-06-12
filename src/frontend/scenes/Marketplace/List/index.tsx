import React, {useEffect, useState} from 'react';
import {CardTitle, Description, InfiniteScroll} from "../styles";
import cityView from "../assets/city1.jpg";
import {Card} from "antd";
import {Loader} from "../Loader";

const VISIBLE_CARDS_COUNT = 12

export type CityItem = {
  id: number;
  description: string;
  name: string;
};

type ListProps = {
  items: CityItem[];
}

export const List = (props: ListProps) => {
  const {items} = props;
  const [visibleCards, setVisibleCards] = useState<CityItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setVisibleCards(items.slice(0, VISIBLE_CARDS_COUNT))

    if (visibleCards.length >= items.length)
      setHasMore(false);
    else setHasMore(true);
  }, [items]);

  const fetchMore = () => {
    setVisibleCards((prev) => [...prev, ...items.slice(prev.length - 1, prev.length + VISIBLE_CARDS_COUNT)]);

    if (visibleCards.length >= items.length)
      setHasMore(false);
  }

  return (
      <InfiniteScroll
        dataLength={visibleCards.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<Loader />}
      >
        {visibleCards.map((value, index) => (
            <Card
              key={`${value.name}_${index}`}
              cover={<img draggable={false} alt="example" src={cityView} />}
            >
              <CardTitle>{value.name}</CardTitle>
              <Description>{value.description}</Description>
            </Card>
        ))}
      </InfiniteScroll>
  );
};
