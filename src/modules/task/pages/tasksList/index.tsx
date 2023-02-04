import { useQuery } from 'react-query';
import { api } from '../../../../hooks/useApi';
import TaskListView from './view';
import 'moment-timezone';
import Moment from 'react-moment';

import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TaskI } from '../../types/taskI';
import moment from 'moment';

const TaskList = () => {
	const { data } = useQuery('tasks', () =>
		api.get('/v1/task').then((res) => res.data.content)
	);

	const columnHelper = createColumnHelper<TaskI>();

	const columns = [
		columnHelper.accessor('task', {
			cell: (info) => info.getValue(),
			header: 'Task',
		}),
		columnHelper.accessor('deadline', {
			cell: (info) => moment(info.getValue()).format('DD/MM/YYYY'),
			header: 'Prazo',
		}),
		columnHelper.accessor('concluded', {
			cell: (info) => (
				<Flex alignItems={'center'} justifyContent={'center'} gap={'2'}>
					<Checkbox defaultChecked={info.getValue()} />
					<Text>{info.getValue() ? 'Concluída' : 'Não Concluída'}</Text>
				</Flex>
			),
			header: 'Situação',
		}),
	];

	return (
		<>
			<TaskListView data={data} columns={columns} />
		</>
	);
};

export default TaskList;
