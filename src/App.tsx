import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Container,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const [task, setTask] = useState<any[]>([]);

	console.log(task);

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
	}, []);

	return (
		<Container paddingY={'2'}>
			<Button onClick={() => toggleColorMode()}>
				{colorMode === 'dark' ? (
					<SunIcon color={'orange.300'} />
				) : (
					<MoonIcon color={'blue.300'} />
				)}
			</Button>
			{task &&
				task.map((t) => (
					<Card marginBottom={'2'}>
						<CardHeader>{t.task}</CardHeader>
						<CardBody>
							<Text>{t.createdAt}</Text>
							<Text>{t.deadline}</Text>
							<Text>{t.conclued ? 'Concluída' : 'Não conluída'}</Text>
						</CardBody>
					</Card>
				))}
		</Container>
	);
};

export default App;
