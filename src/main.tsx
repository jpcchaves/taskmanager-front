import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraBaseProvider } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraBaseProvider resetCSS={true} theme={theme}>
			<Router>
				<App />
			</Router>
		</ChakraBaseProvider>
	</React.StrictMode>
);
