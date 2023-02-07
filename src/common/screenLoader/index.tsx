import { Box, Heading, Spinner } from '@chakra-ui/react';

const ScreenLoader = ({ message = 'Aguarde...' }: { message: string }) => {
	return (
		<Box
			w='full'
			h='full'
			position={'absolute'}
			zIndex={'999'}
			display='flex'
			justifyContent='center'
			alignItems='center'
			sx={{
				backgroundColor: 'rgba(0,0,0,0.4)',
				filter: '4px',
			}}
		>
			<Box
				display={'flex'}
				justifyContent='center'
				alignItems='center'
				flexDirection={'column'}
				gap={'4'}
			>
				<Heading size='md'>{message}</Heading>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Box>
		</Box>
	);
};

export default ScreenLoader;
