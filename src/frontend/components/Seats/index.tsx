import React, { ReactElement, useCallback, useState } from "react";
import { chunk } from "lodash";
import { Row, Seat } from "./styles";
import { LayoutWithNotification } from "../LayoutWithNotification";

type SeatProps = {
  filmId: number;
  refetchSeats: () => Promise<void>;
  takenSeats: number[];
};

export function Seats({
  filmId,
  refetchSeats,
  takenSeats,
}: SeatProps): ReactElement {
  const seatsList = Array.from({ length: 40 }, (_, i) => i + 1);
  const [] = useState();

  const createSeatsRows = useCallback(() => {
    return chunk(seatsList, 5);
  }, []);

  const bookSeat = async ({
    seatId,
    triggerNotification,
  }: {
    seatId: number;
    triggerNotification: ({
      notificationText,
      notificationType,
    }: {
      notificationType: "danger" | "success";
      notificationText: string;
    }) => void;
  }) => {
    await fetch("http://localhost:4000/book-seat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        filmId,
        seatId,
      }),
    }).then(async (res) => {
      if (!res.ok) {
        const parsed = await res.json();
        triggerNotification({
          notificationText: "Seat successfully booked!",
          notificationType: "danger",
        });
      }

      triggerNotification({
        notificationText: "Seat successfully booked!",
        notificationType: "success",
      });
      await refetchSeats();
    });
  };

  return (
    <LayoutWithNotification title="Select a seat you want">
      {(triggerNotification) => (
        <>
          {createSeatsRows().map((chunk) => (
            <Row>
              {chunk.map((value) => (
                <Seat
                  $isTaken={takenSeats.includes(value)}
                  onClick={() =>
                    bookSeat({ seatId: value, triggerNotification })
                  }
                >
                  {value}
                </Seat>
              ))}
            </Row>
          ))}
        </>
      )}
    </LayoutWithNotification>
  );
}
