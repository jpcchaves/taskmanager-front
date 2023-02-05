import { useMutation } from 'react-query';
import { api } from '../../../hooks/useApi';

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
