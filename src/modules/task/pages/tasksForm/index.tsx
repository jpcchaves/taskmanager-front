import { useFormik } from 'formik';
import * as Yup from 'yup';
import TasksFormView from './view';

const TasksForm = () => {
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
			console.log(values);
		},
	});

	return <TasksFormView validation={validation} />;
};

export default TasksForm;
