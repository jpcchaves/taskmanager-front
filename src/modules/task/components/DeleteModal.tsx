import { WarningTwoIcon } from '@chakra-ui/icons';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';

interface DeleteModalPropsI {
	isOpen: boolean;
	onClose: () => void;
	handleDeleteTask: (id: number) => void;
	selectedId: number | null;
}

const DeleteModal = ({
	isOpen,
	onClose,
	handleDeleteTask,
	selectedId,
}: DeleteModalPropsI) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader
					textTransform={'uppercase'}
					textAlign='center'
					display={'flex'}
					alignItems='center'
					justifyContent='center'
					gap='2'
				>
					Cuidado! <WarningTwoIcon color='orange.400' />
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign={'justify'}>
					<Text>Esta ação ocasionará na exclusão da tarefa.</Text>
					<Text>Deseja continuar?</Text>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button
						colorScheme='red'
						onClick={() => {
							onClose();
							handleDeleteTask(selectedId!);
						}}
					>
						Deletar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeleteModal;
