import React, { useState, useEffect } from "react";
import "./SnakeGame.css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
];

const getRandomFood = (snake) => {
  while (true) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    const onSnake = snake.some((seg) => seg.x === x && seg.y === y);
    if (!onSnake) return { x, y };
  }
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(() => getRandomFood(INITIAL_SNAKE));
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // handle keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        !isRunning &&
        !gameOver &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        setIsRunning(true);
      }

      setDirection((prev) => {
        switch (e.key) {
          case "ArrowUp":
            if (prev.y === 1) return prev;
            return { x: 0, y: -1 };
          case "ArrowDown":
            if (prev.y === -1) return prev;
            return { x: 0, y: 1 };
          case "ArrowLeft":
            if (prev.x === 1) return prev;
            return { x: -1, y: 0 };
          case "ArrowRight":
            if (prev.x === -1) return prev;
            return { x: 1, y: 0 };
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, gameOver]);

  // game loop
  useEffect(() => {
    if (!isRunning || gameOver) return;

    const speed = 150;
    const intervalId = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsRunning(false);
          setGameOver(true);
          return prevSnake;
        }

        // self collision
        const hitSelf = prevSnake.some(
          (seg) => seg.x === newHead.x && seg.y === newHead.y
        );
        if (hitSelf) {
          setIsRunning(false);
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(getRandomFood(newSnake));
          return newSnake; // grow
        } else {
          newSnake.pop(); // move
          return newSnake;
        }
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [direction, isRunning, gameOver, food]);

  const handleStart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection({ x: 1, y: 0 });
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  const cells = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isHead = snake[0].x === x && snake[0].y === y;
      const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
      const isFood = food.x === x && food.y === y;

      let className = "cell";
      if (isSnake) className += " cell-snake";
      if (isHead) className += " cell-head";
      if (isFood) className += " cell-food";

      cells.push(<div key={`${x}-${y}`} className={className} />);
    }
  }

  return (
    <div className="snake-container">
      <h1>Snake Game</h1>

      <div className="info-row">
        <div>Score: {score}</div>
        <button onClick={handleStart}>
          {gameOver ? "Restart" : isRunning ? "Restart" : "Start"}
        </button>
      </div>

      {gameOver && <div className="status status-gameover">Game Over!</div>}
      {!gameOver && !isRunning && (
        <div className="status">Press any arrow key or click Start</div>
      )}

      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {cells}
      </div>

      <p className="hint">
        Use the arrow keys to move the snake. Eat the red food and avoid
        crashing!
      </p>
    </div>
  );
};

export default SnakeGame;
