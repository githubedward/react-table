import React from 'react';
import { FixedSizeList as List } from 'react-window';
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
import { VirtualizedTableRow } from './VirtualizedTableRow';
import { useTableSort } from '../hooks/useTableSort';
import { useColumnOrder } from '../hooks/useColumnOrder';

interface DataTableProps {
  data: UserWithComputedFields[];
}

const ROW_HEIGHT = 50;
const HEADER_HEIGHT = 60; // Approximate header height
const CONTAINER_HEIGHT = 400; // Match the CSS data-table height
const TABLE_HEIGHT = CONTAINER_HEIGHT - HEADER_HEIGHT;

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
        <div className="virtualized-table">
          <div className="table-header">
            <div className="table-row">
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
            </div>
          </div>
          <div className="table-body">
            <List
              height={TABLE_HEIGHT}
              itemCount={sortedData.length}
              itemSize={ROW_HEIGHT}
              itemData={{
                users: sortedData,
                columns,
              }}
              width="100%"
            >
              {VirtualizedTableRow}
            </List>
          </div>
        </div>
      </DndContext>
    </div>
  );
}; 