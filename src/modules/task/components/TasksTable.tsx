import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
	Box,
	Center,
	chakra,
	Container,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

export type DataTableProps<Data extends object> = {
	data: Data[];
	columns: ColumnDef<Data, any>[];
};

export function TasksTable<Data extends object>({
	data,
	columns,
}: DataTableProps<Data>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<Container pt={'2'} centerContent maxW='2xl'>
			<Table variant='striped' colorScheme='blackAlpha'>
				<Thead>
					{data &&
						table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
											textAlign={'center'}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											<chakra.span pl='4'>
												{header.column.getIsSorted() ? (
													header.column.getIsSorted() === 'desc' ? (
														<TriangleDownIcon aria-label='sorted descending' />
													) : (
														<TriangleUpIcon aria-label='sorted ascending' />
													)
												) : null}
											</chakra.span>
										</Th>
									);
								})}
							</Tr>
						))}
				</Thead>
				<Tbody>
					{data &&
						table.getRowModel().rows.map((row) => (
							<Tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<Td key={cell.id} textAlign={'center'}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Td>
									);
								})}
							</Tr>
						))}
				</Tbody>
			</Table>
		</Container>
	);
}
