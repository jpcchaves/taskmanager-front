import { useMutation, useQueryClient } from 'react-query';
import { api } from './useApi';

const useDeleteTaskMutation = () => {
	const deleteTask = async (id: number) => {
		return await api.delete(`/v1/tasks/${id}`);
	};

	const deleteTaskMutation = useMutation({
		mutationFn: (id: number) => {
			return deleteTask(id);
		},
	});

	const { mutate, isLoading } = deleteTaskMutation;

	return { mutate, isLoading };
};

export default useDeleteTaskMutation;
