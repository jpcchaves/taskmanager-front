import { AddIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';

const TasksFormView = () => {
	const isError = true;

	return (
		<Container maxW={{ lg: '3xl', md: '5xl', sm: 'container.xl' }} pt={'6'}>
			<FormControl
				isInvalid={isError}
				border={'1px solid #ccc'}
				p={'8'}
				rounded={'md'}
				boxShadow={'lg'}
				isRequired
			>
				<Heading size='md' textAlign={'center'}>
					Criar nova task
				</Heading>
				<Formik>
					<Form>
						<FormLabel>Task</FormLabel>
						<Input type='text' name='task' placeholder='Digite a task...' />
						<FormErrorMessage>A task é obrigatória</FormErrorMessage>

						<FormLabel pt={'4'}>Prazo</FormLabel>
						<Input
							type='datetime-local'
							name='deadline'
							placeholder='Digite a task...'
						/>
						<FormErrorMessage>O prazo é obrigatório</FormErrorMessage>

						<Flex mt='8' justifyContent='flex-end'>
							<Button colorScheme='blue' type='submit'>
								Criar
							</Button>
						</Flex>
					</Form>
				</Formik>
			</FormControl>
		</Container>
	);
};

export default TasksFormView;
