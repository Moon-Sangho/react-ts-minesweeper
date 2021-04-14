import { ReactNode, useEffect, useState } from 'react';
import NumberDisplay from 'components/NumberDisplay';
import Button from 'components/Button';
import { generateCells } from 'utils';
import { Face } from 'types';
import 'components/App.scss';

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(Face.default);

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

  const renderCelles = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          value={cell.value}
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
        <div className="Face">
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderCelles()}</div>
    </div>
  );
};

export default App;
