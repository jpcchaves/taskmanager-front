import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../../hooks/useApi';
import useCreateTaskMutation from '../../../../hooks/useCreateTaskMutation';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import { tasKValidation } from '../../utils/validation/taskValidationSchema';
import TasksFormView from './view';

import moment from 'moment';
import 'moment-timezone';
import { useMutation } from 'react-query';

const TasksForm = () => {
	const toast = useToast();
	const { handleNavigate } = useHandleNavigate();
	const { id } = useParams();

	const getTaskById = async () => {
		const res = await api.get(`/v1/task/${id}`);
		return res.data;
	};

	const {
		data: taskById,
		mutate: getTaskByIdMutate,
		isLoading: taskByIdLoading,
	} = useMutation(getTaskById, {
		mutationKey: 'taskById',
	});

	useEffect(() => {
		if (id) {
			getTaskByIdMutate(id, {});
		} else {
			return () => {};
		}
	}, []);

	const { mutate: createTaskMutate, isLoading } = useCreateTaskMutation();

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			task: taskById ? taskById.task : '',
			deadline: taskById
				? moment(taskById.deadline).format('YYYY-MM-DDThh:mm')
				: '',
		},
		validationSchema: tasKValidation,
		onSubmit: (values) => {
			createTaskMutate(values, {
				onSuccess: () => {
					toast({
						title: 'Task criada com sucesso!',
						status: 'success',
						position: 'top-right',
						duration: 3000,
						isClosable: true,
					});
					handleNavigate('/');
				},
				onError: (e: any) => {
					const { message } = e?.response?.data;
					toast({
						title: 'Ocorreu um erro ao criar a task!',
						description: message,
						status: 'error',
						position: 'top-right',
						duration: 3000,
						isClosable: true,
					});
				},
			});
		},
	});

	return (
		<TasksFormView
			validation={validation}
			isLoading={isLoading}
			taskByIdLoading={taskByIdLoading}
			handleNavigate={handleNavigate}
			id={id}
		/>
	);
};

export default TasksForm;
