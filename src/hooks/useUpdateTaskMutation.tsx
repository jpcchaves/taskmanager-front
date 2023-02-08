import { useMutation } from 'react-query';
import { api } from './useApi';

const useUpdateTaskMutation = () => {
	const updateTaskMutation = () => {
		return useMutation(async (formPayload) => {
			const res = await api.put(`/v1/task/${formPayload?.id}`, formPayload);
			return res.data;
		});
	};
	const { mutate, isLoading } = updateTaskMutation();

	return { mutate, isLoading };
};

export default useUpdateTaskMutation;
