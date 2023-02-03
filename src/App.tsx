import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
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
import { api } from './hooks/useApi';
import { TaskI } from './types/taskI';

const App = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const [task, setTask] = useState<TaskI[]>([]);

	const getTasks = async () => {
		try {
			const res = await api.get('/api/v1/task');
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
					<Card key={t.id} marginBottom={'2'}>
						<CardHeader>{t.task}</CardHeader>
						<CardBody>
							<Text>{t.createdAt}</Text>
							<Text>{t.deadline}</Text>
							<Text>{t.concluded ? 'Concluída' : 'Não conluída'}</Text>
						</CardBody>
					</Card>
				))}
		</Container>
	);
};

export default App;
