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
import useUpdateTaskMutation from '../../../../hooks/useUpdateTaskMutation';
import { FormPayloadI } from '../../types/FormPayloadI';

const TasksForm = () => {
	const toast = useToast();
	const { handleNavigate } = useHandleNavigate();
	const { id } = useParams();

	const {
		data: taskById,
		mutate: getTaskByIdMutate,
		isLoading: taskByIdLoading,
	} = useGetTaskByIdMutation();

	useEffect(() => {
		if (id) {
			getTaskByIdMutate(id, {});
		} else {
			return () => {};
		}
	}, []);

	const { mutate: createTaskMutate, isLoading } = useCreateTaskMutation();

	const { mutate: updateTaskMutate, isLoading: updateLoading } =
		useUpdateTaskMutation();

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			task: taskById ? taskById.task : '',
			deadline: taskById
				? moment(taskById.deadline).utc().format('YYYY-MM-DDTHH:mm')
				: '',
			concluded: taskById ? taskById.concluded : false,
		},
		validationSchema: tasKValidation,
		onSubmit: (values: FormPayloadI) => {
			if (id) {
				const valuesToSubmit = {
					id,
					formPayload: values,
				};

				updateTaskMutate(valuesToSubmit, {
					onSuccess: () => {
						toast({
							title: 'Task editada com sucesso!',
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
			} else {
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
			}
		},
	});

	return (
		<TasksFormView
			validation={validation}
			isLoading={isLoading}
			updateLoading={updateLoading}
			taskByIdLoading={taskByIdLoading}
			handleNavigate={handleNavigate}
			taskById={taskById}
			id={id}
		/>
	);
};

export default TasksForm;
