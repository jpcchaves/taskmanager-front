import { useMutation } from 'react-query';
import { api } from './useApi';

const useDeleteTaskMutation = () => {
	const deleteTaskMutation = () => {
		return useMutation((id) => {
			return api.delete(`/v1/task/${id}`);
		});
	};
	const { mutate, isLoading, isSuccess } = deleteTaskMutation();

	return { mutate, isLoading, isSuccess };
};

export default useDeleteTaskMutation;
