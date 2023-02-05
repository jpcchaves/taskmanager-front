import {
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FormikHelpers, FormikValues } from 'formik/dist/types';
import FormInvalidFeedback from '../../components/FormInvalidFeedback';

interface TaskFormViewI {
	validation: FormikValues;
	isLoading: boolean;
}

const TasksFormView = ({ validation, isLoading }: TaskFormViewI) => {
	return (
		<Container maxW={{ lg: '3xl', md: '5xl', sm: 'container.xl' }} pt={'6'}>
			<FormControl
				border={'1px solid #ccc'}
				p={'8'}
				rounded={'md'}
				boxShadow={'lg'}
			>
				<Heading size='md' textAlign={'center'}>
					Criar nova task
				</Heading>
				<Formik
					initialValues={{
						task: '',
						deadline: '',
					}}
					onSubmit={function (
						values: { task: string; deadline: string },
						formikHelpers: FormikHelpers<{
							task: string;
							deadline: string;
						}>
					): void | Promise<any> {
						throw new Error('Function not implemented.');
					}}
				>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validation.handleSubmit();
							return false;
						}}
					>
						<FormLabel>Task</FormLabel>
						<Input
							type='text'
							name='task'
							placeholder='Digite a task...'
							onChange={validation.handleChange}
							value={validation.values.task || ''}
							isInvalid={validation.touched.task && validation.errors.task}
						/>
						{validation.touched.task && validation.errors.task ? (
							<FormInvalidFeedback message={validation.errors.task} />
						) : null}

						<FormLabel pt={'4'}>Prazo</FormLabel>
						<Input
							type='datetime-local'
							name='deadline'
							placeholder='Digite a task...'
							onChange={validation.handleChange}
							value={validation.values.deadline || ''}
							isInvalid={
								validation.touched.deadline && validation.errors.deadline
							}
						/>
						{validation.touched.deadline && validation.errors.deadline ? (
							<FormInvalidFeedback message={validation.errors.deadline} />
						) : null}

						<Flex mt='8' justifyContent='flex-end'>
							<Button colorScheme='blue' type='submit' isLoading={isLoading}>
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
