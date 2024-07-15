import { Grid } from '@chakra-ui/react';
import ContactCard from './ContactCard';
import { useEffect, useState } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const ContactGrid = ({ contacts, setContacts }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/contacts');
        const data = await res.json();
        // console.log(data);

        if (!res.ok) {
          throw new Error(data.error);
        }
        setContacts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, [setContacts]);

  console.log(contacts);

  return (
    <>
      <Grid
        templateColumns={{
          base: '1fr', // show 1 card on small screens
          md: 'repeat(2, 1fr)', // show 2 on mediums
          lg: 'repeat(3, 1fr)', // show 3 on large
        }}
        gap={4}
      >
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            setContacts={setContacts}
          />
        ))}
      </Grid>

      {isLoading && (
        <Flex justifiyContent={'center'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
    </>
  );
};

export default ContactGrid;
