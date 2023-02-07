import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

interface DeleteModalPropsI {
	isOpen: boolean;
	onClose: () => void;
	handleDeleteTask: (id: number) => void;
	selectedId: number;
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
				<ModalHeader textTransform={'uppercase'} textAlign='center'>
					Cuidado!
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign={'justify'}>
					Esta ação ocasionará na exclusão da tarefa. Deseja continuar?
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button
						colorScheme='red'
						onClick={() => handleDeleteTask(selectedId)}
					>
						Deletar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeleteModal;
