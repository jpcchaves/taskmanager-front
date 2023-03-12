import { useMutation } from 'react-query';
import { api } from './useApi';
import { FormPayloadI } from '../modules/task/types/FormPayloadI';

const useCreateTaskMutation = () => {
	const createTask = async (formPayload: FormPayloadI) => {
		return await api.post('/v1/tasks', formPayload);
	};

	const createTaskMutation = useMutation({
		mutationFn: (formPayload: FormPayloadI) => {
			return createTask(formPayload);
		},
	});

	const { mutate, isLoading } = createTaskMutation;

	return { mutate, isLoading };
};

export default useCreateTaskMutation;
