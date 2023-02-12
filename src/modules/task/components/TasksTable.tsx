import {
	ArrowLeftIcon,
	ArrowRightIcon,
	TriangleDownIcon,
	TriangleUpIcon,
} from '@chakra-ui/icons';
import {
	Box,
	chakra,
	Table,
	Tbody,
	Td,
	Text,
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
	toggleMoreTasks: () => void;
	toggleLessTasks: () => void;
	tasksPage: number;
};

export function TasksTable<Data extends object>({
	data,
	columns,
	toggleMoreTasks,
	toggleLessTasks,
	tasksPage,
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
		<Box overflowY={'auto'}>
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
										<Td key={cell.id} userSelect={'none'}>
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
			<Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					cursor={'pointer'}
					onClick={() => toggleLessTasks()}
				>
					<ArrowLeftIcon />
				</Box>
				<Text>{tasksPage + 1}</Text>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					cursor={'pointer'}
					onClick={() => toggleMoreTasks()}
				>
					<ArrowRightIcon />
				</Box>
			</Box>
		</Box>
	);
}
