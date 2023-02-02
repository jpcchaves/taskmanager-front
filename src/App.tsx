import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Container, useColorMode } from '@chakra-ui/react';

const App = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container>
			<Button onClick={() => toggleColorMode()}>
				{colorMode === 'dark' ? (
					<SunIcon color={'orange.300'} />
				) : (
					<MoonIcon color={'blue.300'} />
				)}
			</Button>
		</Container>
	);
};

export default App;
