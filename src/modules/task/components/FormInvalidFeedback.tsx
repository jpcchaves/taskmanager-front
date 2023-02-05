import { Text } from '@chakra-ui/react';

const FormInvalidFeedback = ({ message }: { message: String }) => {
	return (
		<Text fontSize={'sm'} pt='1' pl='1' color={'red.500'}>
			{message}
		</Text>
	);
};

export default FormInvalidFeedback;
