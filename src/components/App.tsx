import { ReactNode, useEffect, useState } from 'react';
import NumberDisplay from 'components/NumberDisplay';
import Button from 'components/Button';
import { generateCells } from 'utils';
import { Face } from 'types';
import 'components/App.scss';

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(Face.default);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setFace(Face.oh);
    };

    const handleMouseUp = () => {
      setFace(Face.default);
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleCellClick = (rowParam: number, colParam: number) => () => {
    console.log(rowParam, colParam);

    // start game
    if (!live) {
      setLive(true);
    }
  };

  const handleFaceClick = () => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const renderCelles = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          row={rowIndex}
          col={colIndex}
        />
      ))
    );
  };

  console.log('cells', cells);

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCelles()}</div>
    </div>
  );
};

export default App;
