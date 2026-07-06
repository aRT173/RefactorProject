import React, {useCallback, useEffect, useRef} from 'react';
import {Container, InnerSquare, Logo} from "./styles";

const DirectionEnum = {
  Up: -1,
  Down: 1,
  Left: -1,
  Right: 1,
}

const SPEED = 0.2

export const Bouncing = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const frameId = useRef<number | null>(null)
  const lastTimestamp = useRef<number>(0)
  const position = useRef({x: 0, y: 0})
  const direction = useRef({x: DirectionEnum.Right, y: DirectionEnum.Down})

  const step = useCallback((timestamp: number) => {
    if (!innerRef.current || !containerRef.current)
      return

    if (!lastTimestamp.current) lastTimestamp.current = timestamp;

    const delta = timestamp - lastTimestamp.current;
    lastTimestamp.current = timestamp;

    const rightBoundary = containerRef.current.clientWidth - innerRef.current.clientWidth
    const bottomBoundary = containerRef.current.clientHeight - innerRef.current.clientHeight

    position.current.x += direction.current.x * SPEED * delta;
    position.current.y += direction.current.y * SPEED * delta;

    if (position.current.x >= rightBoundary) {
      position.current.x = rightBoundary;
      direction.current.x = DirectionEnum.Left;
    }
    if (position.current.x <= 0) {
      position.current.x = 0;
      direction.current.x = DirectionEnum.Right;
    }

    if (position.current.y >= bottomBoundary) {
      position.current.y = bottomBoundary;
      direction.current.y = DirectionEnum.Up;
    }
    if (position.current.y <= 0) {
      position.current.y = 0;
      direction.current.y = DirectionEnum.Down;
    }

    innerRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

    frameId.current = requestAnimationFrame(step);
  }, [])

  useEffect(() => {
    frameId.current = requestAnimationFrame(step);

    return () => {
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    }
  }, [step])


  return (
    <Container ref={containerRef}>
      <InnerSquare ref={innerRef}>
        <Logo src="./images/dvd_logo.png" alt="logo"/>
      </InnerSquare>
    </Container>
  );
};
