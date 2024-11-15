import { Container, Title, SubTitle, ButtonBox, Button, LeftContainer, RightContainer } from "./styles";
import { Link } from "react-router-dom";
import {MapPin, Search} from "lucide-react"


export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <Title>BREAKING LOCATIONS</Title>
        <SubTitle>Encontre um local para treinar</SubTitle>
        <div className="flex flex-col gap-2 items-center">
        <Link to="/register">
          <Button onClick={() => { }}>
            <ButtonBox>
              <MapPin />
            </ButtonBox>
            Cadastre um local
          </Button>
        </Link>
        <Link to="/localization">
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
        <img src="/public/home-background.svg" alt=""  />
      </RightContainer>
    </Container>
  )
}