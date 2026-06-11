import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, FilmCard } from "./styles";
import { BaseLayout } from "../../components/BaseLayout";
import { DefaultOptionType } from "antd/es/select";
import { Select } from "../../components/Select";

export function FilmsList(): ReactElement {
  const [filmsList, setFilmsList] = useState<
    Array<{ id: string; title: string }>
  >([]);
  const [options, setOptions] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    const getFilms = async () => {
      await fetch("http://localhost:4000/films-list", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setFilmsList(data.list));
    };

    getFilms();
  }, []);

  useEffect(() => {
    const getOptions = async () => {
      await fetch("http://localhost:4000/options", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) =>
          setOptions(data.options));
    };

    getOptions();
  }, []);

  return (
    <BaseLayout title={"Choose a film you want"}>
      <Container>
        {filmsList.map(({ id, title }) => (
          <Link to={`/films/${id}`}>
            <FilmCard>{title}</FilmCard>
          </Link>
        ))}
        <Select label="Селект" allowSearch options={options} allowEmpty />
      </Container>
    </BaseLayout>
  );
}
