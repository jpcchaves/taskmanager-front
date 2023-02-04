import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';

const config = {
	initialColorMode: 'system',
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	fonts: {
		heading: 'Roboto',
		body: 'Roboto',
	},
});

export default theme;
