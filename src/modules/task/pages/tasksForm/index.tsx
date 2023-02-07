import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../../hooks/useApi';
import useCreateTaskMutation from '../../../../hooks/useCreateTaskMutation';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import { TaskI } from '../../types/taskI';
import { tasKValidation } from '../../utils/validation/taskValidationSchema';
import TasksFormView from './view';

import moment from 'moment';
import 'moment-timezone';

const TasksForm = () => {
	const toast = useToast();
	const { handleNavigate } = useHandleNavigate();
	const [taskById, setTaskById] = useState<TaskI>();
	const { id } = useParams();

	const getTaskById = async () => {
		const res = await api.get(`/v1/task/${id}`);
		setTaskById(res.data);
	};

	useEffect(() => {
		if (id) {
			getTaskById();
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

	return <TasksFormView validation={validation} isLoading={isLoading} />;
};

export default TasksForm;
