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
	Tooltip,
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
	totalPages: number;
};

export function TasksTable<Data extends object>({
	data,
	columns,
	toggleMoreTasks,
	toggleLessTasks,
	tasksPage,
	totalPages,
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
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'end'}
				gap={'2'}
				pt={'2'}
			>
				<Tooltip
					label={tasksPage <= 0 ? 'Você já está na primeira página!' : ''}
					hasArrow
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						cursor={tasksPage <= 0 ? 'not-allowed' : 'pointer'}
						onClick={() => toggleLessTasks()}
					>
						<ArrowLeftIcon boxSize={'3'} mr={'1'} />
						<Text>Anterior</Text>
					</Box>
				</Tooltip>
				<Text textDecoration={'underline'} fontWeight={'bold'}>
					{tasksPage + 1} de {totalPages}
				</Text>
				<Tooltip
					label={
						tasksPage + 1 >= totalPages ? 'Você já está na última página!' : ''
					}
					hasArrow
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						cursor={tasksPage + 1 >= totalPages ? 'not-allowed' : 'pointer'}
						onClick={() => toggleMoreTasks()}
					>
						<Text>Próxima</Text>
						<ArrowRightIcon boxSize={'3'} ml={'1'} />
					</Box>
				</Tooltip>
			</Box>
		</Box>
	);
}
