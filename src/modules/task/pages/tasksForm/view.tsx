import {
	Box,
	Button,
	Checkbox,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Tooltip,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FormikHelpers, FormikValues } from 'formik/dist/types';
import ScreenLoader from '../../../../common/screenLoader';
import FormInvalidFeedback from '../../components/FormInvalidFeedback';
import { TaskI } from '../../types/taskI';

interface TaskFormViewI {
	validation: FormikValues;
	isLoading: boolean;
	taskByIdLoading: boolean;
	id: string | undefined;
	handleNavigate: (path: string) => void;
	updateLoading: boolean;
	taskById: TaskI;
}

const TasksFormView = ({
	validation,
	isLoading,
	taskByIdLoading,
	id,
	handleNavigate,
	updateLoading,
	taskById,
}: TaskFormViewI) => {
	return (
		<>
			{taskByIdLoading || updateLoading ? (
				<ScreenLoader
					message={updateLoading ? 'Atualizando a task...' : 'Carregando...'}
				/>
			) : null}
			<Container maxW={{ lg: '3xl', md: '5xl', sm: 'container.xl' }} pt={'6'}>
				<FormControl
					border={'1px solid #ccc'}
					p={'8'}
					rounded={'md'}
					boxShadow={'lg'}
				>
					<Heading size='md' textAlign={'center'}>
						{id
							? `Editando a task: ${taskById?.task || ''}`
							: 'Criar nova task'}
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

							{id ? (
								<Box mt={'4'}>
									<Checkbox
										name='concluded'
										onChange={validation.handleChange}
										isChecked={validation.values.concluded}
									>
										<Tooltip
											label='Clique na caixa ao lado para concluir a tarefa'
											hasArrow
											placement='bottom-start'
										>
											Concluída?
										</Tooltip>
									</Checkbox>
								</Box>
							) : null}

							<Flex mt='8' justifyContent='flex-end' gap={'2'}>
								<Button
									colorScheme={'gray'}
									variant={'outline'}
									type='button'
									onClick={() => handleNavigate('/')}
								>
									Voltar
								</Button>
								<Button colorScheme='blue' type='submit' isLoading={isLoading}>
									{id ? 'Editar' : 'Criar'}
								</Button>
							</Flex>
						</Form>
					</Formik>
				</FormControl>
			</Container>
		</>
	);
};

export default TasksFormView;
