import { FaArrowDown, FaArrowUp, FaTrash } from 'react-icons/fa';

interface IngredientActionsProps {
  index: number;
  totalItems: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
}

export function IngredientActions({
  index,
  totalItems,
  onMoveUp,
  onMoveDown,
  onRemove,
}: IngredientActionsProps) {
  return (
    <div className="list-col join">
      <button
        className="btn join-item"
        type="button"
        onClick={() => {
          if (index > 0) {
            onMoveUp(index);
          }
        }}
      >
        <FaArrowUp />
      </button>
      <button
        className="btn join-item"
        type="button"
        onClick={() => {
          if (index < totalItems - 1) {
            onMoveDown(index);
          }
        }}
      >
        <FaArrowDown />
      </button>
      <button
        className="btn btn-primary join-item"
        type="button"
        onClick={() => {
          onRemove(index);
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
}

