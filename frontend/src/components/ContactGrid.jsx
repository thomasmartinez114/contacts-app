import { Grid } from '@chakra-ui/react';
import UserCard from './UserCard';
import { USERS } from '../dummy/dummy';

const ContactGrid = () => {
  return (
    <Grid
      templateColumns={{
        base: '1fr', // show 1 card on small screens
        md: 'repeat(2, 1fr)', // show 2 on mediums
        lg: 'repeat(3, 1fr)', // show 3 on large
      }}
    >
      {USERS.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  );
};

export default ContactGrid;
