import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { UserWithComputedFields } from '../types';
import { DraggableTableHeader } from './DraggableTableHeader';
import { TableRow } from './TableRow';
import { useTableSort } from '../hooks/useTableSort';
import { useColumnOrder } from '../hooks/useColumnOrder';

interface DataTableProps {
  data: UserWithComputedFields[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const { sortedData, handleSort, getSortIcon } = useTableSort(data);
  const { columns, reorderColumns } = useColumnOrder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex(col => col.key === active.id);
      const newIndex = columns.findIndex(col => col.key === over?.id);
      reorderColumns(oldIndex, newIndex);
    }
  };

  return (
    <div className="data-table">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="table">
          <thead>
            <tr>
              <SortableContext
                items={columns.map(col => col.key)}
                strategy={horizontalListSortingStrategy}
              >
                {columns.map(column => (
                  <DraggableTableHeader
                    key={column.key}
                    column={column}
                    sortIcon={getSortIcon(column.key as keyof UserWithComputedFields)}
                    onSort={() => handleSort(column.key as keyof UserWithComputedFields)}
                  />
                ))}
              </SortableContext>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(user => (
              <TableRow key={user.id} user={user} columns={columns} />
            ))}
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}; 