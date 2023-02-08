import { useMutation } from 'react-query';
import { api } from './useApi';

const useToggleConcludedMutation = () => {
	const updateTask = async ({
		id,
		...concluded
	}: {
		id: string | undefined;
		concluded: boolean;
	}) => {
		return await api.patch(`/v1/task/${id}`, concluded);
	};

	const updateConcludedMutation = () => {
		return useMutation(async (concludedPayload) => {
			return updateTask(concludedPayload!);
		});
	};
	const { mutate, isLoading } = updateConcludedMutation();

	return { mutate, isLoading };
};

export default useToggleConcludedMutation;
