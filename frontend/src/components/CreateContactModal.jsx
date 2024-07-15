import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Textarea,
  RadioGroup,
  Radio,
  ModalFooter,
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';

const ContactGrid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Contact</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Flex alignItems={'center'} gap={4}>
              {/* Full Name */}
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder='John Doe' />
              </FormControl>

              {/* Role */}
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input placeholder='Software Engineer' />
              </FormControl>
            </Flex>

            {/* Description */}
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                resize={'none'}
                overflowY={'hidden'}
                placeholder="He's a software engineer who loves to code and build things."
              />
            </FormControl>

            {/* Gender Selection */}
            <RadioGroup mt={4}>
              <Flex gap={5}>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
              </Flex>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactGrid;
