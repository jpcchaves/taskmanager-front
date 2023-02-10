import { useMutation } from 'react-query';
import { api } from './useApi';

const useGetTaskByIdMutation = () => {
	const getTaskById = async (id: string | undefined) => {
		const res = await api.get(`/v1/task/${id}`);
		return res.data;
	};

	const getTaskByIdMutation = useMutation({
		mutationFn: (id: string | undefined) => {
			return getTaskById(id);
		},
	});

	// const getTaskByIdMutation = () => {
	// 	return useMutation(getTaskById);
	// };

	const { data, mutate, isLoading } = getTaskByIdMutation;

	return { mutate, isLoading, data };
};

export default useGetTaskByIdMutation;
