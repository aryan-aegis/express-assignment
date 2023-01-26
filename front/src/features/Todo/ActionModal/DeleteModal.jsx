import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
import { CustomToast } from '../../../components/CustomToast';

export function DeleteModal({id,todo,isOpen,onClose}){
    const {MyToast} = CustomToast();
    const deleteTodo = ()=>{
        MyToast("Todo Deleted","success")
        onClose();
    }
    
    return (<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={"1.2rem"}>
            {todo}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={deleteTodo}>
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}