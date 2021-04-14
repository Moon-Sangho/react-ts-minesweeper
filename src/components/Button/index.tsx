import React from 'react';
import { CellState, CellValue } from 'types';
import 'components/Button/index.scss';

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (e: React.MouseEvent) => void;
  onContext(rowParam: number, colParam: number): (e: React.MouseEvent) => void;
  red?: boolean;
}

const Button = ({
  row,
  col,
  state,
  value,
  onClick,
  onContext,
  red,
}: ButtonProps) => {
  const renderContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }

      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className={`Button ${
        state === CellState.visible ? 'visible' : ''
      } value-${value} ${red ? 'red' : ''}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
