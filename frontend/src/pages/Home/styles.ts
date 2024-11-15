import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 54px;
  color: ${(props) => props.theme.primary};
  padding-bottom: 50px;
  text-align: center;
  font-weight: bold;
  max-width: 500px;
`;

export const SubTitle = styled.p`
  font-size: 24px;
  padding-bottom: 50px;
  text-align: center;
  max-width: 500px;
  font-weight: bold;
`;

export const ButtonBox = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.white};
  height: 50px;
  width: 40px;

  font-size: 30px;

  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  height: 50px;
  border: none;
  border-radius: 5px;
  position: relative;
  padding-left: 50px;
  padding-right: 10px;

  &:hover {
    filter: opacity(0.9);
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  overflow: hidden; // oculta o excesso caso a imagem ultrapasse os limites do contêiner

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // mantém a proporção, preenchendo o contêiner
  }
`;

export const Image = styled.img.attrs(() => ({
  src: "home-image.svg",
}))`
  width: 50%;
`;