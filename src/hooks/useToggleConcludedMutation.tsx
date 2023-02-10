import { useMutation } from 'react-query';
import { api } from './useApi';

interface TogglePayloadI {
	id: number | undefined;
	concluded: boolean;
}

const useToggleConcludedMutation = () => {
	const updateTask = async ({ id, ...concluded }: TogglePayloadI) => {
		return await api.patch(`/v1/task/${id}`, concluded);
	};

	const updateConcludedMutation = useMutation({
		mutationFn: (payload: TogglePayloadI) => {
			return updateTask(payload);
		},
	});

	const { isLoading, mutate } = updateConcludedMutation;

	return { isLoading, mutate };
};
export default useToggleConcludedMutation;
