```jsx
import { useMemo, useState } from 'react'
import Table from '@/components/ui/Table'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { DragDropContext, Draggable } from '@hello-pangea/dnd'
import { MdDragIndicator } from 'react-icons/md'
import { data10 } from './data'
import { StrictModeDroppable } from '@/components/shared'

const { Tr, Th, Td, THead, TBody } = Table

const DragAndDrop = () => {
    const [data, setData] = useState(data10)

    const reorderData = (startIndex, endIndex) => {
        const newData = [...data]
        const [movedRow] = newData.splice(startIndex, 1)
        newData.splice(endIndex, 0, movedRow)
        setData(newData)
    }

    const handleDragEnd = (result) => {
        const { source, destination } = result
        if (!destination) return
        reorderData(source.index, destination.index)
    }

    const columns = useMemo(
        () => [
            {
                id: 'dragger',
                header: '',
                accessorKey: 'dragger',
                cell: (props) => (
                    <span {...props.dragHandleProps}>
                        <MdDragIndicator />
                    </span>
                ),
            },
            { header: 'First Name', accessorKey: 'firstName' },
            { header: 'Last Name', accessorKey: 'lastName' },
            { header: 'Email', accessorKey: 'email' },
        ],
        [],
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // Note: Drag & drop will not work in React.StrictMode(Development)
    return (
        <Table className="w-full">
            <THead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </Th>
                            )
                        })}
                    </Tr>
                ))}
            </THead>
            <DragDropContext onDragEnd={handleDragEnd}>
                <StrictModeDroppable droppableId="table-body">
                    {(provided) => (
                        <TBody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <Draggable
                                        key={row.id}
                                        draggableId={row.id}
                                        index={row.index}
                                    >
                                        {(provided, snapshot) => {
                                            const { style } =
                                                provided.draggableProps
                                            return (
                                                <Tr
                                                    ref={provided.innerRef}
                                                    className={
                                                        snapshot.isDragging
                                                            ? 'table'
                                                            : ''
                                                    }
                                                    style={style}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {row
                                                        .getVisibleCells()
                                                        .map((cell) => {
                                                            return (
                                                                <Td
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext(),
                                                                    )}
                                                                </Td>
                                                            )
                                                        })}
                                                </Tr>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </TBody>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </Table>
    )
}

export default DragAndDrop
```
