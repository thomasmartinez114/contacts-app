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
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';

const ContactCard = ({ contact }) => {
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={'1'} gap={'4'} alignItems={'center'}>
            <Avatar src='https://avatar.iran.liara.run/public' />

            <Box>
              <Heading size='sm'>{contact.name}</Heading>
              <Text>{contact.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal />
            <IconButton
              variant='ghost'
              colorScheme='red'
              size={'sm'}
              aria-label='See Menu'
              icon={<BiTrash size={20} />}
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
