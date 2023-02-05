import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import useCreateTaskMutation from '../../components/useCreateTaskMutation';
import TasksFormView from './view';

const TasksForm = () => {
	const toast = useToast();
	const { handleNavigate } = useHandleNavigate();

	const { mutate, isLoading } = useCreateTaskMutation();

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			task: '',
			deadline: '',
		},
		validationSchema: Yup.object().shape({
			task: Yup.string().required('A task é obrigatória!'),
			deadline: Yup.date().required('O prazo é obrigatório!'),
		}),
		onSubmit: (values) => {
			mutate(values, {
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
