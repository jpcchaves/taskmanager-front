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
import ScreenLoader from '../../../../common/screenLoader';
import DeleteModal from '../../components/DeleteModal';

import Lottie from 'lottie-react';
import ManWithTasklist from '../../../../assets/animations/man-with-tasklist.json';
interface TaskListViewI {
	data: Array<TaskI>;
	columns: ColumnDef<TaskI, any>[];
	handleNavigate: (path: string) => void;
	tasksAmount: number;
	requireMoreTasks: () => void;
	isLoading: boolean;
	deleteLoading: boolean;
	isOpen: boolean;
	onClose: () => void;
	handleDeleteTask: (id: number) => void;
	selectedId: number | null;
	toggleConcludedLoading: boolean;
}

const TaskListView = ({
	data,
	columns,
	handleNavigate,
	tasksAmount,
	requireMoreTasks,
	isLoading,
	deleteLoading,
	isOpen,
	onClose,
	handleDeleteTask,
	selectedId,
	toggleConcludedLoading,
}: TaskListViewI) => {
	let count = 0;
	data?.map((t) => (t.concluded !== true ? count++ : null));

	return (
		<Box pb={'36'}>
			{deleteLoading ? (
				<ScreenLoader message='Sua task está sendo deletada...' />
			) : null}

			{toggleConcludedLoading ? (
				<ScreenLoader message='Sua task está sendo atualizada...' />
			) : null}

			<DeleteModal
				isOpen={isOpen}
				onClose={onClose}
				handleDeleteTask={handleDeleteTask}
				selectedId={selectedId}
			/>

			<Container maxW={'1200'}>
				{data?.length ? (
					<Container maxW='full'>
						<Container pt='6' pb='2'>
							<Box>
								<Heading size='md' textAlign={'center'}>
									Atualmente você possui {count} tasks não concluídas
								</Heading>
							</Box>
						</Container>
						<TasksTable columns={columns} data={data} />
						<Flex pt='4' justifyContent={'center'}>
							<Button
								onClick={() => requireMoreTasks()}
								colorScheme='blue'
								isLoading={isLoading}
								mt='8'
							>
								Carregar mais tasks
							</Button>
						</Flex>
					</Container>
				) : (
					<Flex justifyContent={'center'} alignItems={'center'}>
						<Box boxSize={'container.sm'}>
							<Box>
								<Heading
									size='md'
									textAlign={'center'}
									marginBottom={{ lg: '-32', md: '-24', sm: '-1' }}
									marginTop={'6'}
								>
									Você ainda não possui nenhuma task cadastrada. Comece a se
									planejar!
								</Heading>
							</Box>
							<Lottie animationData={ManWithTasklist} />
						</Box>
					</Flex>
				)}
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
