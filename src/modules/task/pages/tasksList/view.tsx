import { AddIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Center,
	Container,
	Heading,
	keyframes,
	Tooltip,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { TasksTable } from '../../components/TasksTable';
import { TaskI } from '../../types/taskI';

interface TaskListViewI {
	data: Array<TaskI>;
	columns: ColumnDef<TaskI, any>[];
}

const animation = keyframes`
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(359deg);
		}
	`;

const TaskListView = ({ data, columns }: TaskListViewI) => {
	let count = 0;
	data?.map((t) => (t.concluded !== true ? count++ : null));

	const buttonAnimation = `${animation} ease-in-out 1s`;

	return (
		<Box pb={'36'}>
			<Container pt='6' pb='2'>
				<Box>
					<Heading size='md' textAlign={'center'}>
						Atualmente você possui {count} tasks não concluídas
					</Heading>
				</Box>
			</Container>
			<Container maxW={'1200'}>
				<TasksTable columns={columns} data={data} />
			</Container>

			<Tooltip label='Adicionar nova tarefa' hasArrow>
				<Button
					position={'fixed'}
					bottom={7}
					right={5}
					width={12}
					height={12}
					bg={'blue.300'}
					rounded={'full'}
					_hover={{
						bg: 'blue.500',
						color: 'white',
						animation: buttonAnimation,
					}}
					
				>
					<AddIcon />
				</Button>
			</Tooltip>
		</Box>
	);
};

export default TaskListView;
