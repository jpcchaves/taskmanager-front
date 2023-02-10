import { Box, Flex, Heading } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import ManWithTasklist from '../../../assets/animations/man-with-tasklist.json';

const ManWithTasklistAnimation = () => {
	return (
		<Flex justifyContent={'center'} alignItems={'center'}>
			<Box boxSize={'container.sm'}>
				<Box>
					<Heading
						size='md'
						textAlign={'center'}
						marginBottom={{ lg: '-32', md: '-24', sm: '-1' }}
						marginTop={'6'}
					>
						Você ainda não possui nenhuma task cadastrada
					</Heading>
				</Box>
				<Lottie animationData={ManWithTasklist} />
			</Box>
		</Flex>
	);
};

export default ManWithTasklistAnimation;
