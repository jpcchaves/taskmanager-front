import { useMutation } from 'react-query';
import { TogglePayloadI } from '../modules/task/types/TogglePayloadI';
import { api } from './useApi';

const useToggleConcludedMutation = () => {
	const updateTask = async ({ id, concluded }: TogglePayloadI) => {
		const updatedConcluded = {
			concluded,
		};

		return await api.patch(`/v1/tasks/${id}`, updatedConcluded);
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
