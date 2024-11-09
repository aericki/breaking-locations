import { Container, Title, SubTitle, ButtonBox, Button, LeftContainer, RightContainer } from "./styles";
import { Link } from "react-router-dom";
import {MapPin, Search} from "lucide-react"


export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <Title>O Mapa do bate osso</Title>
        <SubTitle>encontre um local para treinar</SubTitle>
        <div className="flex flex-col gap-2 items-center">
        <Link to="/cadastro">
          <Button onClick={() => { }}>
            <ButtonBox>
              <MapPin />
            </ButtonBox>
            Cadastre a localização de onde voce bateu osso
          </Button>
        </Link>
        <Link to="/localizacao">
          <Button onClick={() => { }}>
            <ButtonBox>
              <Search />
            </ButtonBox>
            Procure um local de treino.
          </Button>
        </Link>
        </div>
        
      </LeftContainer>
      <RightContainer>
      </RightContainer>
    </Container>
  )
}