import { AddIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Tooltip,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { TasksTable } from '../../components/TasksTable';
import { TaskI } from '../../types/taskI';

import { motion } from 'framer-motion';
interface TaskListViewI {
	data: Array<TaskI>;
	columns: ColumnDef<TaskI, any>[];
	handleNavigate: (path: string) => void;
	tasksAmount: number;
	requireMoreTasks: () => void;
}

const TaskListView = ({
	data,
	columns,
	handleNavigate,
	tasksAmount,
	requireMoreTasks,
}: TaskListViewI) => {
	let count = 0;
	data?.map((t) => (t.concluded !== true ? count++ : null));

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
				<Flex pt='4' justifyContent={'center'}>
					<Button onClick={() => requireMoreTasks()} colorScheme='blue'>
						Carregar mais tasks
					</Button>
				</Flex>
			</Container>

			<Tooltip label='Adicionar nova tarefa' hasArrow>
				<Button
					as={motion.button}
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
					}}
					whileHover={{ rotate: 180, scale: 1.05 }}
					transition='0.2s linear'
					onClick={() => handleNavigate('/task/new')}
				>
					<AddIcon />
				</Button>
			</Tooltip>
		</Box>
	);
};

export default TaskListView;
