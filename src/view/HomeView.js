import { Container, Box } from "@chakra-ui/react"

import Filter from 'components/Filter'

function Home() {
    return (
        <Box className="home" backgroundColor="gray.100">
            <Container  maxW="container.lg" h="100%">
                <Filter></Filter>
            </Container>
        </Box>
    )
}

export default Home;