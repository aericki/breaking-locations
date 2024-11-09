import { Container, Title, SubTitle, ButtonBox, Button, LeftContainer, RightContainer } from "./styles";
import { Link } from "react-router-dom";
import {MapPin, Search} from "lucide-react"


export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <Title>BREAKING LOCATIONS</Title>
        <SubTitle>encontre um local para treinar</SubTitle>
        <div className="flex flex-col gap-2 items-center">
        <Link to="/cadastro">
          <Button onClick={() => { }}>
            <ButtonBox>
              <MapPin />
            </ButtonBox>
            Cadastre um local
          </Button>
        </Link>
        <Link to="/localizacao">
          <Button onClick={() => { }}>
            <ButtonBox>
              <Search />
            </ButtonBox>
            Encontre um local de treino.
          </Button>
        </Link>
        </div>
        
      </LeftContainer>
      <RightContainer>
      </RightContainer>
    </Container>
  )
}