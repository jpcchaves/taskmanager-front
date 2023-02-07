import { useMutation } from 'react-query';
import { api } from './useApi';

const useGetTaskByIdMutation = (id: string | undefined) => {
	const getTaskById = async () => {
		const res = await api.get(`/v1/task/${id}`);
		return res.data;
	};

	const getTaskByIdMutation = () => {
		return useMutation(getTaskById);
	};
	const { data, mutate, isLoading } = getTaskByIdMutation();

	return { mutate, isLoading, data };
};

export default useGetTaskByIdMutation;
