import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../../../../hooks/useApi';
import useHandleNavigate from '../../../../hooks/useHandleNavigate';
import TasksFormView from './view';

const TasksForm = () => {
	const toast = useToast();
	const { handleNavigate } = useHandleNavigate();

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
		onSubmit: async (values) => {
			try {
				await api.post('/v1/task/new', values);

				toast({
					title: 'Task criada com sucesso!',
					status: 'success',
					position: 'top-right',
					duration: 3000,
					isClosable: true,
				});

				handleNavigate('/');
			} catch (e: any) {
				const { message } = e?.response?.data;
				toast({
					title: 'Ocorreu um erro ao criar a task!',
					description: message,
					status: 'error',
					position: 'top-right',
					duration: 3000,
					isClosable: true,
				});
			}
		},
	});

	return <TasksFormView validation={validation} />;
};

export default TasksForm;
