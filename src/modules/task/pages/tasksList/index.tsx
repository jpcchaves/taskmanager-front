// Api
import { useQuery, useQueryClient } from 'react-query';
import { api } from '../../../../hooks/useApi';
// Components
import {
	ButtonGroup,
	Checkbox,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import TaskListView from './view';
// Utils
import moment from 'moment';
import 'moment-timezone';
// Types
import { TaskI } from '../../types/taskI';
// Hooks
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import useDeleteTaskMutation from '../../../../hooks/useDeleteTaskMutation';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import useToggleConcludedMutation from '../../../../hooks/useToggleConcludedMutation';

const TaskList = () => {
	const client = useQueryClient();
	const toast = useToast();
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleNavigate } = useHandleNavigate();
	const [tasksAmount, setTaksAmount] = useState(10);
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 200) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const { mutate: deleteMutate, isLoading: deleteLoading } =
		useDeleteTaskMutation();

	const { mutate: toggleConcludedMutation, isLoading: toggleConcludedLoading } =
		useToggleConcludedMutation();

	const requireMoreTasks = () => {
		setTaksAmount((prevState) => prevState + 10);
	};

	const getTasks = async () => {
		const { data } = await api.get(
			`/v1/task?size=${tasksAmount}&orderBy=createdAt&direction=DESC`
		);
		return data.content;
	};
	const {
		data,
		isLoading: tasksLoading,
		isRefetching,
	} = useQuery(['tasks', tasksAmount], getTasks, {
		refetchOnWindowFocus: false,
		keepPreviousData: true,
	});

	const columnHelper = createColumnHelper<TaskI>();

	const handleDeleteTask = (id: number) => {
		deleteMutate(id, {
			onSuccess: () => {
				toast({
					title: 'Task deletada com sucesso!',
					status: 'success',
					position: 'top-right',
					duration: 3000,
					isClosable: true,
				});
				client.invalidateQueries(['tasks']);
			},
			onError: (e: any) => {
				const { message } = e?.response?.data;
				toast({
					title: 'Ocorreu um erro ao deletar a task!',
					description: message,
					status: 'error',
					position: 'top-right',
					duration: 3000,
					isClosable: true,
				});
			},
		});
	};

	const handleEditTask = (id: number) => {
		handleNavigate(`/task/edit/${id}`);
	};

	const handleToggleConcluded = async (row: TaskI) => {
		const { id, concluded } = row;

		const inverseConcluded = {
			id,
			concluded: !concluded,
		};

		toggleConcludedMutation(inverseConcluded, {
			onSuccess: () => {
				toast({
					title: 'Task atualizada com sucesso!',
					status: 'success',
					position: 'top-right',
					duration: 3000,
					isClosable: true,
				});
				client.invalidateQueries(['tasks']);
			},
		});
	};

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
			cell: (info) => moment(info.getValue()).utc().format('DD/MM/YYYY'),
			header: 'Prazo',
		}),
		columnHelper.accessor('concluded', {
			cell: (info) => (
				<Checkbox
					defaultChecked={info.getValue()}
					onChange={() => handleToggleConcluded(info.row.original)}
				>
					{info.getValue() ? 'Concluída' : 'Não Concluída'}
				</Checkbox>
			),
			header: 'Situação',
		}),
		{
			header: 'Ações',
			cell: ({ row }: { row: any }) => (
				<ButtonGroup display={'flex'} gap='2'>
					<Tooltip label='Editar task' placement='top-end' hasArrow>
						<EditIcon
							color={'green.300'}
							transition={'0.2s'}
							_hover={{
								color: 'green.500',
							}}
							cursor={'pointer'}
							onClick={() => handleEditTask(row.original.id)}
						/>
					</Tooltip>
					<Tooltip label='Deletar task' placement='top-end' hasArrow>
						<DeleteIcon
							color={'red.300'}
							transition={'0.2s'}
							_hover={{
								color: 'red.500',
							}}
							cursor={'pointer'}
							onClick={() => {
								setSelectedId(row.original.id);
								onOpen();
							}}
						/>
					</Tooltip>
				</ButtonGroup>
			),
		},
	];

	return (
		<>
			<TaskListView
				data={data}
				columns={columns}
				handleNavigate={handleNavigate}
				tasksAmount={tasksAmount}
				requireMoreTasks={requireMoreTasks}
				tasksLoading={tasksLoading}
				deleteLoading={deleteLoading}
				isOpen={isOpen}
				onClose={onClose}
				handleDeleteTask={handleDeleteTask}
				selectedId={selectedId}
				toggleConcludedLoading={toggleConcludedLoading}
				isRefetching={isRefetching}
				isVisible={isVisible}
				scrollToTop={scrollToTop}
			/>
		</>
	);
};

export default TaskList;
