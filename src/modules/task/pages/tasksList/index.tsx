// Api
import { useQuery, useQueryClient } from 'react-query';
import { api } from '../../../../hooks/useApi';
// Components
import {
	ButtonGroup,
	Checkbox,
	Input,
	InputGroup,
	InputRightElement,
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
import { DeleteIcon, EditIcon, Search2Icon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import useDeleteTaskMutation from '../../../../hooks/useDeleteTaskMutation';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import useToggleConcludedMutation from '../../../../hooks/useToggleConcludedMutation';
import { toggleLessTasks } from '../../utils/fn/toggleLessTasks';
import { toggleMoreTasks } from '../../utils/fn/toggleMoreTasks';

import { PageDirection } from '../../utils/enum/PageDirection';
import { toggleFirstPage } from '../../utils/fn/toggleFirstPage';
import { toggleLastPage } from '../../utils/fn/toggleLastPage';

const TaskList = () => {
	const client = useQueryClient();
	const toast = useToast();
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleNavigate } = useHandleNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [tasksPage, setTasksPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [searchWord, setSearchWord] = useState('');
	const [filteredTasks, setFilteredTasks] = useState<TaskI[]>([]);

	const handleIncreaseTaskPage = () => {
		setTasksPage((prevState) => prevState + 1);
	};

	const handleDecreaseTaskPage = () => {
		setTasksPage((prevState) => prevState - 1);
	};

	const handleFirstPage = () => {
		setTasksPage(0);
	};

	const handleLastPage = () => {
		setTasksPage(totalPages - 1);
	};

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

	const getTasks = async () => {
		const { data } = await api.get(
			`/v1/tasks?page=${tasksPage}&orderBy=createdAt&direction=DESC&size=15`
		);

		setTotalPages(data.totalPages);

		return data.content;
	};

	const handlePageChange = (direction: PageDirection) => {
		if (direction === PageDirection.next) {
			toggleMoreTasks({ handleIncreaseTaskPage, tasksPage, totalPages });
		} else if (direction === PageDirection.previous) {
			toggleLessTasks({ handleDecreaseTaskPage, tasksPage });
		} else if (direction === PageDirection.first) {
			toggleFirstPage({ handleFirstPage });
		} else if (direction === PageDirection.last) {
			toggleLastPage({ handleLastPage });
		} else {
			return;
		}
	};

	const {
		data,
		isLoading: tasksLoading,
		isRefetching,
	} = useQuery(['tasks', tasksPage], getTasks, {
		refetchOnWindowFocus: false,
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

	const handleInputChange = (e: string) => {
		setSearchWord(e);
	};

	const filterTasks = () => {
		const filter = data.filter((task: TaskI) => {
			if (searchWord.length) {
				return task.task.toLowerCase().includes(searchWord.toLowerCase());
			} else {
				return;
			}
		});

		if (filter.length) {
			return setFilteredTasks(filter);
		} else {
			window.alert(`Não foi encontrada nenhuma task com o nome: ${searchWord}`);
		}
	};

	const handleCleanFilter = () => {
		setFilteredTasks([]);
		setSearchWord('');
	};

	return (
		<>
			<TaskListView
				data={data}
				filteredTasks={filteredTasks}
				columns={columns}
				handleInputChange={handleInputChange}
				searchWord={searchWord}
				filterTasks={filterTasks}
				handleCleanFilter={handleCleanFilter}
				handleNavigate={handleNavigate}
				tasksLoading={tasksLoading}
				deleteLoading={deleteLoading}
				isOpen={isOpen}
				onClose={onClose}
				handleDeleteTask={handleDeleteTask}
				selectedId={selectedId}
				toggleConcludedLoading={toggleConcludedLoading}
				isVisible={isVisible}
				scrollToTop={scrollToTop}
				handlePageChange={handlePageChange}
				tasksPage={tasksPage}
				totalPages={totalPages}
			/>
		</>
	);
};

export default TaskList;
