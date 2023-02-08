import { useMutation } from 'react-query';
import { TaskI } from '../modules/task/types/taskI';
import { api } from './useApi';

const useUpdateTaskMutation = () => {
	const updateTask = async ({
		id,
		...formPayload
	}: {
		id: string | undefined;
		formPayload: TaskI;
	}) => {
		return await api.put(`/v1/task/${id}`, formPayload);
	};

	const updateTaskMutation = () => {
		return useMutation(async (formPayload) => {
			return updateTask(formPayload!);
		});
	};
	const { mutate, isLoading } = updateTaskMutation();

	return { mutate, isLoading };
};

export default useUpdateTaskMutation;
