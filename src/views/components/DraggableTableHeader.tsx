import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnConfig } from "../../models/types";

interface DraggableTableHeaderProps {
  column: ColumnConfig;
  sortIcon?: string;
  onSort?: () => void;
}

export const DraggableTableHeader: React.FC<DraggableTableHeaderProps> = ({ column, sortIcon, onSort }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <th
      ref={setNodeRef}
      style={{ ...style, width: column.width }}
      className={`table-header sortable ${isDragging ? "dragging" : ""}`}
      {...attributes}
    >
      <div className="header-content">
        <div className="drag-handle" {...listeners}>
          ⋮⋮
        </div>
        <div className="header-text" onClick={onSort}>
          <span>{column.label}</span>
          {sortIcon && <span className="sort-icon">{sortIcon}</span>}
        </div>
      </div>
    </th>
  );
};
