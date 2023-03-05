import { AddIcon, ArrowUpIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Card,
	CardBody,
	Container,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputRightElement,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Tooltip,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { TasksTable } from '../../components/TasksTable';
import { TaskI } from '../../types/taskI';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import ScreenLoader from '../../../../common/screenLoader';
import DeleteModal from '../../components/DeleteModal';
import ManWithTasklistAnimation from '../../components/ManWithTasklistAnimation';
import { PageDirection } from '../../utils/enum/PageDirection';

interface TaskListViewI {
	data: Array<TaskI>;
	filteredTasks: Array<TaskI>;
	columns: ColumnDef<TaskI, any>[];
	handleNavigate: (path: string) => void;
	tasksLoading: boolean;
	deleteLoading: boolean;
	isOpen: boolean;
	handleCleanFilter: () => void;
	onClose: () => void;
	handleInputChange: (e: string) => void;
	searchWord: string;
	filterTasks: () => void;
	handleDeleteTask: (id: number) => void;
	selectedId: number | null;
	toggleConcludedLoading: boolean;
	isVisible: boolean;
	scrollToTop: () => void;
	handlePageChange: (direction: PageDirection) => void;
	tasksPage: number;
	totalPages: number;
}

const TaskListView = ({
	data,
	filteredTasks,
	columns,
	handleInputChange,
	searchWord,
	filterTasks,
	handleCleanFilter,
	handleNavigate,
	tasksLoading,
	deleteLoading,
	isOpen,
	onClose,
	handleDeleteTask,
	selectedId,
	toggleConcludedLoading,
	isVisible,
	scrollToTop,
	handlePageChange,
	tasksPage,
	totalPages,
}: TaskListViewI) => {
	let count = 0;
	data?.map((t) => (t.concluded !== true ? count++ : null));

	return (
		<Box pb={'36'}>
			{deleteLoading ? (
				<ScreenLoader message='Sua task está sendo deletada...' />
			) : null}

			{toggleConcludedLoading ? (
				<ScreenLoader message='Sua task está sendo atualizada...' />
			) : null}

			{tasksLoading ? <ScreenLoader message='Buscando tasks...' /> : null}

			<DeleteModal
				isOpen={isOpen}
				onClose={onClose}
				handleDeleteTask={handleDeleteTask}
				selectedId={selectedId}
			/>

			<Container maxW={'1200'}>
				{!data?.length && !tasksLoading ? (
					<ManWithTasklistAnimation />
				) : (
					<Container maxW='full'>
						<Grid
							templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
							gap={4}
						>
							<GridItem>
								<Accordion defaultIndex={[0]} allowToggle>
									<AccordionItem>
										<AccordionButton
											display={'flex'}
											justifyContent='center'
											alignItems='center'
										>
											Resumo das tasks
											<AccordionIcon />
										</AccordionButton>
										<AccordionPanel>
											<Card>
												<CardBody>
													<Stat>
														<StatLabel>Tasks não concluídas</StatLabel>
														<StatNumber>
															<CountUp end={count} duration={2} />
														</StatNumber>
														<StatHelpText>Pagina: {tasksPage + 1}</StatHelpText>
													</Stat>
												</CardBody>
											</Card>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</GridItem>
							<GridItem>
								<InputGroup>
									<Input
										onChange={(e) => handleInputChange(e.target.value)}
										value={searchWord}
									/>
									<InputRightElement
										children={
											<>
												<Search2Icon
													cursor={'pointer'}
													onClick={() => filterTasks()}
												/>
												{searchWord.length ? (
													<CloseIcon
														ml={'2'}
														mr={'4'}
														cursor={'pointer'}
														boxSize={3}
														onClick={() => handleCleanFilter()}
													/>
												) : null}
											</>
										}
									/>
								</InputGroup>
							</GridItem>
						</Grid>

						<TasksTable
							columns={columns}
							data={filteredTasks.length ? filteredTasks : data}
							handlePageChange={handlePageChange}
							tasksPage={tasksPage}
							totalPages={totalPages}
						/>
					</Container>
				)}
			</Container>

			{isVisible && (
				<Tooltip label='Voltar para o topo' hasArrow placement='left'>
					<Button
						as={motion.div}
						cursor={'pointer'}
						colorScheme={'blue'}
						animate={{
							opacity: [0, 1],
							scale: [0, 1],
							rotate: [0, 360],
						}}
						// @ts-ignore no problem in operation, although type error appears.
						transition={{
							duration: 1,
							ease: 'linear',
						}}
						onClick={scrollToTop}
						position='fixed'
						bottom={'7'}
						rounded={'full'}
						right={5}
						width={12}
						height={12}
						zIndex={3}
						whileHover={{ scale: 1.1 }}
					>
						<ArrowUpIcon />
					</Button>
				</Tooltip>
			)}

			<Tooltip label='Adicionar nova tarefa' hasArrow placement='left'>
				<Button
					as={motion.button}
					position={'fixed'}
					bottom={isVisible ? '20' : '7'}
					right={5}
					width={12}
					height={12}
					colorScheme={'blue'}
					rounded={'full'}
					whileHover={{ rotate: 270, scale: 1.05 }}
					transition='0.2s linear'
					onClick={() => handleNavigate('/task/new')}
				>
					<AddIcon />
				</Button>
			</Tooltip>
		</Box>
	);
};

export default TaskListView;
