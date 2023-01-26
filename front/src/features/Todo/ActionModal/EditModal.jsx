import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { CustomToast } from '../../../components/CustomToast';

export function EditModal({id,todo,isOpen,onClose}){
    const [text,setText] = useState("");
    const {MyToast} = CustomToast();
    const updateTodo = ()=>{
        console.log(text);
        MyToast("Todo Updated","success");
        onClose();
    }
    
    return (<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={"1.2rem"}>
            
            <FormControl mt="10px">
                <FormLabel>Edit todo</FormLabel>
                <Input defaultValue={todo} onChange={(e)=>setText(e.target.value)}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={updateTodo}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}