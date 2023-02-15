import { useMutation } from 'react-query';
import { UpdateTaskPayloadI } from '../modules/task/types/UpdateTaskPayloadI';
import { api } from './useApi';

const useUpdateTaskMutation = () => {
	const updateTask = async ({ id, formPayload }: UpdateTaskPayloadI) => {
		return await api.put(`/v1/tasks/${id}`, formPayload);
	};

	const updateTaskMutation = useMutation({
		mutationFn: (formPayload: UpdateTaskPayloadI) => {
			return updateTask(formPayload);
		},
	});

	const { mutate, isLoading } = updateTaskMutation;

	return { mutate, isLoading };
};

export default useUpdateTaskMutation;
