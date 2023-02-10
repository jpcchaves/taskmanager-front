import { AddIcon, ArrowUpIcon } from '@chakra-ui/icons';
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
	tasksLoading: boolean;
	deleteLoading: boolean;
	isOpen: boolean;
	onClose: () => void;
	handleDeleteTask: (id: number) => void;
	selectedId: number | null;
	toggleConcludedLoading: boolean;
	isRefetching: boolean;
	isVisible: boolean;
	scrollToTop: () => void;
}

const TaskListView = ({
	data,
	columns,
	handleNavigate,
	tasksAmount,
	requireMoreTasks,
	tasksLoading,
	deleteLoading,
	isOpen,
	onClose,
	handleDeleteTask,
	selectedId,
	toggleConcludedLoading,
	isRefetching,
	isVisible,
	scrollToTop,
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

			{tasksLoading ? <ScreenLoader message='Buscando tasks...' /> : null}

			<DeleteModal
				isOpen={isOpen}
				onClose={onClose}
				handleDeleteTask={handleDeleteTask}
				selectedId={selectedId}
			/>

			<Container maxW={'1200'}>
				{!data?.length && !tasksLoading ? (
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
				) : (
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
								isLoading={isRefetching}
								mt='8'
							>
								Carregar mais tasks
							</Button>
						</Flex>
					</Container>
				)}
			</Container>

			{isVisible && (
				<Tooltip label='Voltar para o topo' hasArrow placement='left'>
					<Button
						as={motion.div}
						cursor={'pointer'}
						colorScheme={'blue'}
						animate={{
							scale: [0, 1],
						}}
						// @ts-ignore no problem in operation, although type error appears.
						transition={{
							duration: 1,
							ease: 'linear',
						}}
						onClick={scrollToTop}
						position='fixed'
						bottom={'7'}
						rounded={'full'}
						right={5}
						width={12}
						height={12}
						zIndex={3}
						whileHover={{ scale: 1.05 }}
					>
						<ArrowUpIcon />
					</Button>
				</Tooltip>
			)}

			<Tooltip label='Adicionar nova tarefa' hasArrow placement='left'>
				<Button
					as={motion.button}
					position={'fixed'}
					bottom={isVisible ? '20' : '7'}
					right={5}
					width={12}
					height={12}
					bg={'blue.300'}
					rounded={'full'}
					_hover={{
						bg: 'blue.500',
						color: 'white',
					}}
					whileHover={{ rotate: 270, scale: 1.05 }}
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
