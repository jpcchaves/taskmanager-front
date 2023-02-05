import * as Yup from 'yup';

export const tasKValidation = Yup.object().shape({
	task: Yup.string().required('A task é obrigatória!'),
	deadline: Yup.date().required('O prazo é obrigatório!'),
});
