import { Container } from "@chakra-ui/react"

import Filter from 'components/Filter'

function Home() {
    return (
        <div className="home">
            <Container  maxW="container.lg" h="100%">
                <Filter></Filter>
            </Container>
        </div>
    )
}

export default Home;