import 'components/Button/index.scss';
import { CellState, CellValue } from 'types';

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}

const Button = ({ row, col, state, value }: ButtonProps) => {
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
      } value-${value}`}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
