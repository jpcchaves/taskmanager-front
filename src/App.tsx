import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Container, Text, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const [task, setTask] = useState<any[]>([]);

	const getTasks = async () => {
		try {
			const res = await axios.get('http://localhost:8080/api/v1/task');
			setTask(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTasks();
	});

	return (
		<Container>
			<Button onClick={() => toggleColorMode()}>
				{colorMode === 'dark' ? (
					<SunIcon color={'orange.300'} />
				) : (
					<MoonIcon color={'blue.300'} />
				)}
			</Button>
			{task && task.map((t) => <Text>{t.task}</Text>)}
		</Container>
	);
};

export default App;
