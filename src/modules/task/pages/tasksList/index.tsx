// Api
import { useQuery } from 'react-query';
import { api } from '../../../../hooks/useApi';
// Components
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import TaskListView from './view';
// Utils
import moment from 'moment';
import 'moment-timezone';
// Types
import { TaskI } from '../../types/taskI';
// Hooks
import { useState } from 'react';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';

const TaskList = () => {
	const { handleNavigate } = useHandleNavigate();

	const [tasksAmount, setTaksAmount] = useState(5);

	const requireMoreTasks = () => {
		setTaksAmount((prevState) => prevState + 5);
	};

	const getTasks = async () => {
		const { data } = await api.get(`/v1/task?size=${tasksAmount}`);
		return data.content;
	};
	const { data } = useQuery(['tasks', tasksAmount], getTasks);

	const columnHelper = createColumnHelper<TaskI>();

	const columns = [
		columnHelper.accessor('task', {
			cell: (info) => (
				<Text
					textDecoration={info.row.original.concluded ? 'line-through' : ''}
				>
					{info.getValue()}
				</Text>
			),
			header: 'Tarefa',
		}),
		columnHelper.accessor('createdAt', {
			cell: (info) => moment(info.getValue()).format('DD/MM/YYYY'),
			header: 'Data de Criação',
		}),
		columnHelper.accessor('deadline', {
			cell: (info) => moment(info.getValue()).format('DD/MM/YYYY'),
			header: 'Prazo',
		}),
		columnHelper.accessor('concluded', {
			cell: (info) => (
				<Flex gap={'2'}>
					<Checkbox defaultChecked={info.getValue()} />
					<Text>{info.getValue() ? 'Concluída' : 'Não Concluída'}</Text>
				</Flex>
			),
			header: 'Situação',
		}),
	];

	return (
		<>
			<TaskListView
				data={data}
				columns={columns}
				handleNavigate={handleNavigate}
				tasksAmount={tasksAmount}
				requireMoreTasks={requireMoreTasks}
			/>
		</>
	);
};

export default TaskList;
