
import { useState } from 'react';
import { InputStyled } from '@/components/InputStyled';
import {
  Container,
  Form,
  FormTitle,
  MapContainer,
  Section

} from './styles';
import { Button } from '@/components/ui/button';

import { LatLngExpression } from 'leaflet';
import { Marker, TileLayer, useMapEvents } from 'react-leaflet';
import useGetLocation from '@/hooks/useGetLocation';
import { useToast } from '@/hooks/use-toast';

export default function Cadastrar() {

  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    whatsapp: '',
    latitude: 0,
    longitude: 0,

  });

  const { toast } = useToast();
  const { coords } = useGetLocation();

  function onSubmit() {
    console.log(formValues);

    toast({
      title: 'Local de Treino Cadastrado',
      description: 'Seu local de treino foi cadastrado com sucesso',
    });
  }

  if (!coords) {
    return <h1>Carregando Localização ...</h1>;
  }

  const MapClickEvent = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormValues({ ...formValues, latitude: lat, longitude: lng });
      },
    });

    return null;
  };


  return (
    <Container>
      <Form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        
      }}>
        <FormTitle className='font-bold'>Cadastro do Local de Treino</FormTitle>

        <Section className='section flex flex-col gap-5'>
          Dados
          <InputStyled
            label="Nome"
            name="name" placeholder="Centro de Treinamento e Pesquisa de Peruíbe"
            value={formValues.name}
            onChange={setFormValues}
          />
          <InputStyled
            label="Endereço"
            name="address" placeholder="Rua Sebastião Anunciato 99"
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
            center={
              {
                lat: coords[0],
                lng: coords[1]
              } as LatLngExpression}
            zoom={13}
          >
            <MapClickEvent />

            <TileLayer

              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker
              position={[formValues.latitude, formValues.longitude] as LatLngExpression} />

          </MapContainer>

          <Button
            style={{
              marginTop: '1rem',
              backgroundColor: "#322153",
              color: "white",
            }}
            type='submit'>Cadastrar</Button>
        </Section>

      </Form>
    </Container>
  )
}

