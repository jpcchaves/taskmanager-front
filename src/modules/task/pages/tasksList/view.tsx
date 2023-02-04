import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableProps, TasksTable } from '../../components/TasksTable';
import { TaskI } from '../../types/taskI';

interface TaskListViewI {
	data: Array<TaskI>;
	columns: ColumnDef<TaskI, any>[];
}

const TaskListView = ({ data, columns }: TaskListViewI) => {
	let count = 0;

	data?.map((t) => (t.concluded !== true ? count++ : null));

	return (
		<>
			<Center pt='6' pb='2'>
				<Box>
					<Heading size='md' textAlign={'center'}>
						Atualmente você possui {count} tasks não concluídas
					</Heading>
				</Box>
			</Center>
			<TasksTable columns={columns} data={data} />;
		</>
	);
};

export default TaskListView;
