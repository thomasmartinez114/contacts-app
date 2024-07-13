import { Container, Box, Flex } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Container maxW={'900px'}>
      <Box px={4} my={4} borderRadius={5}>
        <Flex h='16' alignItems={'center'} justifyContent={'space-between'}>
          {/* Left side */}
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={3}
            display={{ base: 'none', sm: 'flex' }}
          ></Flex>

          {/* Right side */}
          <Flex></Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
