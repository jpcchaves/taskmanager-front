import { useQuery } from 'react-query';
import { api } from '../../../../hooks/useApi';
import TaskListView from './view';

import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TasksTable } from '../../components/TasksTable';
import { TaskI } from '../../types/taskI';

const TaskList = () => {
	const { data } = useQuery('tasks', () =>
		api.get('/v1/task').then((res) => res.data.content)
	);

	const columnHelper = createColumnHelper<TaskI>();

	const columns = [
		columnHelper.accessor('concluded', {
			cell: (info) =>
				info.getValue() === true ? (
					<Flex alignItems={'center'} justifyContent={'start'} gap={'2'}>
						<Checkbox defaultChecked />
						<Text>Concluída</Text>
					</Flex>
				) : (
					<Flex alignItems={'center'} justifyContent={'start'} gap={'2'}>
						<Checkbox />
						<Text>Não Conluída</Text>
					</Flex>
				),
			header: 'Situação',
		}),
		columnHelper.accessor('task', {
			cell: (info) => info.getValue(),
			header: 'Task',
		}),
		columnHelper.accessor('deadline', {
			cell: (info) => info.getValue(),
			header: 'Prazo',
		}),
	];

	return (
		<>
			<TaskListView data={data} columns={columns} />
		</>
	);
};

export default TaskList;
