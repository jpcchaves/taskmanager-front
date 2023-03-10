import {
	ArrowLeftIcon,
	ArrowRightIcon,
	Icon,
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
import { BiArrowFromLeft, BiArrowFromRight } from 'react-icons/bi';
import { PageDirection } from '../utils/enum/PageDirection';

export type DataTableProps<Data extends object> = {
	data: Data[];
	columns: ColumnDef<Data, any>[];
	handlePageChange: (direction: PageDirection) => void;
	tasksPage: number;
	totalPages: number;
};

export function TasksTable<Data extends object>({
	data,
	columns,
	tasksPage,
	totalPages,
	handlePageChange,
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
				mt={'3'}
			>
				<Tooltip
					hasArrow
					label={
						tasksPage <= 0
							? 'Voc?? j?? est?? na primeira p??gina!'
							: 'Ir para primeira p??gina'
					}
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						transition={'0.5s'}
						_hover={{ color: 'blue.300' }}
						cursor={tasksPage <= 0 ? 'not-allowed' : 'pointer'}
						onClick={() => handlePageChange(PageDirection.first)}
					>
						<Icon boxSize={'5'} as={BiArrowFromRight} />
					</Box>
				</Tooltip>
				<Tooltip
					label={tasksPage <= 0 ? 'Voc?? j?? est?? na primeira p??gina!' : ''}
					hasArrow
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						cursor={tasksPage <= 0 ? 'not-allowed' : 'pointer'}
						onClick={() => handlePageChange(PageDirection.previous)}
						transition={'0.5s'}
						_hover={{ color: 'blue.300' }}
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
						tasksPage + 1 >= totalPages ? 'Voc?? j?? est?? na ??ltima p??gina!' : ''
					}
					hasArrow
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						cursor={tasksPage + 1 >= totalPages ? 'not-allowed' : 'pointer'}
						onClick={() => handlePageChange(PageDirection.next)}
						transition={'0.5s'}
						_hover={{ color: 'blue.300' }}
					>
						<Text>Pr??xima</Text>
						<ArrowRightIcon boxSize={'3'} ml={'1'} />
					</Box>
				</Tooltip>
				<Tooltip
					label={
						tasksPage + 1 >= totalPages
							? 'Voc?? j?? est?? na ??ltima p??gina!'
							: 'Ir para a ??ltima p??gina'
					}
					hasArrow
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						cursor={tasksPage + 1 >= totalPages ? 'not-allowed' : 'pointer'}
						transition={'0.5s'}
						_hover={{ color: 'blue.300' }}
						onClick={() => handlePageChange(PageDirection.last)}
					>
						<Icon boxSize={'5'} as={BiArrowFromLeft} />
					</Box>
				</Tooltip>
			</Box>
		</Box>
	);
}
