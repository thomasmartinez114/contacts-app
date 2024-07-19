import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  Box,
  IconButton,
  CardBody,
  useToast,
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import { BASE_URL } from '../App';

const ContactCard = ({ contact, setContacts }) => {
  const toast = useToast();
  const handleDeleteContact = async () => {
    try {
      const res = await fetch(BASE_URL + '/contacts/' + contact.id, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setContacts(prevContacts =>
        prevContacts.filter(u => u.id !== contact.id)
      );
      toast({
        title: 'Success',
        status: 'success',
        description: 'Contact deleted successfully',
        duration: 2000,
        position: 'top-center',
      });
    } catch (error) {
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-center',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={'1'} gap={'4'} alignItems={'center'}>
            <Avatar src={contact.imgUrl} />

            <Box>
              <Heading size='sm'>{contact.name}</Heading>
              <Text>{contact.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal contact={contact} setContacts={setContacts}/>
            <IconButton
              variant='ghost'
              colorScheme='red'
              size={'sm'}
              aria-label='See Menu'
              icon={<BiTrash size={20} />}
              onClick={handleDeleteContact}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{contact.description}</Text>
      </CardBody>
    </Card>
  );
};

export default ContactCard;
