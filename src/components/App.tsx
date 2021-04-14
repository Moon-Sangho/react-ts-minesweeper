import { ReactNode, useState } from 'react';
import NumberDisplay from 'components/NumberDisplay';
import Button from 'components/Button';
import { generateCells } from 'utils';
import 'components/App.scss';

const App = () => {
  const [cells, setCells] = useState(generateCells());

  console.log('cells', cells);

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

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="face">
            🙂
          </span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderCelles()}</div>
    </div>
  );
};

export default App;
