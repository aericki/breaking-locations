/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { InputStyled } from '@/components/InputStyled';
import {
  Container,
  Form,
  FormTitle,
  ButtonContainer,
  Button,
  MapContainer,
  Section

} from './styles';

import { LatLngExpression } from 'leaflet';
import { Marker, TileLayer } from 'react-leaflet';


export default function Cadastrar() {

  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    whatsapp: '',
  });

  console.log(formValues)

  return (
    <Container>
      <Form>
        <FormTitle className='font-bold'>Cadastro do Local de Treino</FormTitle>

        <Section className='section flex flex-col gap-5'>
          Dados
          <InputStyled
            label="Nome"
            name="name"            placeholder="Centro de Treinamento e Pesquisa de Peruíbe"
            value={formValues.name}
            onChange={setFormValues}
          />
          <InputStyled
            label="Endereço"
            name="address"            placeholder="Rua Sebastião Anunciato 99"
            value={formValues.address}
            onChange={setFormValues}
          />
          <InputStyled
            label="Cidade"
            name="city"
            placeholder="Peruíbe"
            value={formValues.city}
            onChange={setFormValues}
          />
          <InputStyled
            label="Estado"
            name="state"
            placeholder="São Paulo"
            value={formValues.state}
            onChange={setFormValues}
          />
          <InputStyled
            label="Pais" 
            name="country"
            placeholder="Brasil"
            value={formValues.country}
            onChange={setFormValues}
          />
          <InputStyled
            label="Whatsapp"
            name="whatsapp"
            placeholder="+55 (XX) XXXXX-XXXX"
            value={formValues.whatsapp}
            onChange={setFormValues}
          />
        </Section>

        <Section>
          <MapContainer 
            center={{lat: -23.5489,lng: -46.638} as LatLngExpression} 
            zoom={13}
            whenReady={() => console.log('Mapa carregado')}
          >
            <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={[-23.5489, -46.638] as LatLngExpression} />
          </MapContainer>
        </Section>
      </Form>
    </Container>
  )
}

