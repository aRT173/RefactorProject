import cors from "cors";
import express from "express";
import { faker } from "@faker-js/faker";
const app = express();

const FILM_IDS = {
  SPIDER_MAN: { id: 1 },
  INTERSTELLAR: { id: 2 },
  GREEN_MILE: { id: 3 },
};

const films = [
  { id: FILM_IDS.SPIDER_MAN.id, title: "Spider man" },
  { id: FILM_IDS.INTERSTELLAR.id, title: "Interstellar" },
  { id: FILM_IDS.GREEN_MILE.id, title: "Green mile" },
];

const filmsSeats = {
  [FILM_IDS.SPIDER_MAN.id]: { seats: [] },
  [FILM_IDS.INTERSTELLAR.id]: { seats: [] },
  [FILM_IDS.GREEN_MILE.id]: { seats: [] },
};

const options = [
  {
    "title": "Договор и приложения",
    "types": [
      {
        "value": "1",
        "label": "Договор лизинга",
        "requestMethodId": 1,
        "sort": 0
      },
      {
        "value": "2",
        "label": "Договор купли-продажи",
        "requestMethodId": 1,
        "sort": 1
      },
      {
        "value": "7",
        "label": "Приложение 1 к Договору лизинга. График платежей",
        "requestMethodId": 1,
        "sort": 2
      },
      {
        "value": "8",
        "label": "Приложение 2 к Договору лизинга. Спецификация предмета лизинга",
        "requestMethodId": 1,
        "sort": 3
      },
      {
        "value": "9",
        "label": "Приложение 3 к Договору лизинга. График досрочного погашения",
        "requestMethodId": 1,
        "sort": 4
      }
    ]
  },
  {
    "title": "Отчетные документы",
    "types": [
      {
        "value": "10",
        "label": "Акт сверки",
        "requestMethodId": 1,
        "sort": 0
      },
      {
        "value": "22",
        "label": "Справка о стоимости предмета лизинга",
        "requestMethodId": 1,
        "sort": 3
      },
      {
        "value": "11",
        "label": "Счет-фактура",
        "requestMethodId": 2,
        "sort": 2
      },
      {
        "value": "12",
        "label": "Выписка взаиморасчетов",
        "requestMethodId": 3,
        "sort": 1
      }
    ]
  },
  {
    "title": "Закрытие договора",
    "types": [
      {
        "value": "4",
        "label": "Акт передачи в лизинг",
        "requestMethodId": 1,
        "sort": 2
      },
      {
        "value": "5",
        "label": "ДОПС о передаче в собственность",
        "requestMethodId": 1,
        "sort": 0
      },
      {
        "value": "6",
        "label": "Справка об отсутствии задолженности",
        "requestMethodId": 1,
        "sort": 1
      },
      {
        "value": "100",
        "label": "Иное",
        "requestMethodId": 1,
        "sort": 3
      }
    ]
  }
];

app.use(express.json());
app.use(cors());

app.get("/films-list", (req, res) => {
  res.send({ list: films, status: 200 });
});

app.get("/city-items", (req, res) => {
  const items = Array.from({ length: 5_000 }, (_, i) => ({
    id: i,
    description: faker.lorem.paragraph(3),
    name: faker.location.city(),
    roomsNumber: faker.number.int({ max: 5, min: 1 }),
    rating: faker.number.int({ max: 5, min: 1 }),
    floor: faker.number.int({ max: 20, min: 1 }),
  }));
  res.send({ items, status: 200 });
});

app.post("/book-seat", (req, res) => {
  const { filmId, seatId } = req.body;

  const filmSeatsLists = filmsSeats[filmId];

  if (!filmSeatsLists)
    return res.send({ status: 404, message: "Film not found" });

  const isSeatTaken = filmSeatsLists.seats.find((value) => value === seatId);

  if (!isSeatTaken) {
    filmSeatsLists.seats.push(seatId);
    return res.send({ status: 201 });
  }

  res.status(403).json({
    error: "Forbidden",
    message: "Seat is already taken",
  });
});

app.get("/film/taken-seats/:id", (req, res) => {
  const filmSeats = filmsSeats[Number(req.params.id)];

  if (!filmSeats)
    return res.status(404).json({
      error: "Not found",
      message: "Film not exists",
    });

  return res.status(200).json({ seats: filmSeats.seats });
});

app.get("/options", (req, res) => {
  res.send({ options, status: 200 });
})

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
