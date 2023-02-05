import { useMutation } from 'react-query';
import { api } from './useApi';

const useCreateTaskMutation = () => {
	const createTaskMutation = () => {
		return useMutation((formPayload) => {
			return api.post('/v1/task/new', formPayload);
		});
	};
	const { mutate, isLoading } = createTaskMutation();

	return { mutate, isLoading };
};

export default useCreateTaskMutation;
