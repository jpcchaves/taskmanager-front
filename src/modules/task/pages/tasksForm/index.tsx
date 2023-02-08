import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCreateTaskMutation from '../../../../hooks/useCreateTaskMutation';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import { tasKValidation } from '../../utils/validation/taskValidationSchema';
import TasksFormView from './view';

import moment from 'moment';
import useGetTaskByIdMutation from '../../../../hooks/useGetTaskByIdMutation';

const TasksForm = () => {
	const toast = useToast();
	const { handleNavigate } = useHandleNavigate();
	const { id } = useParams();

	const {
		data: taskById,
		mutate: getTaskByIdMutate,
		isLoading: taskByIdLoading,
	} = useGetTaskByIdMutation(id);

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
				? moment(taskById.deadline).utc().format('YYYY-MM-DDThh:mm')
				: '',
			concluded: taskById ? taskById.concluded : false,
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
