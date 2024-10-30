/* eslint-disable @typescript-eslint/no-unused-vars */

import { Container, Title, SubTitle, ButtonBox, Button, LeftContainer, RightContainer } from "./styles";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <Title>O Mapa do bate osso</Title>
        <SubTitle>encontre um local para treinar</SubTitle>

        <Link to="/register">
          <Button onClick={() => { }}>
            <ButtonBox>
              {">"}
            </ButtonBox>
            Cadastre a localização de onde voce bateu osso
          </Button>
        </Link>
      </LeftContainer>
      <RightContainer>
      </RightContainer>
    </Container>
  )
}