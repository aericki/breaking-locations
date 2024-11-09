
import { useState } from 'react';
import { default as RenamedCaptcha} from '../../utils/captcha';
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
import { getReverseGeocoding } from '@/api/getReverseGeocoding';
import { createLocation } from '@/api/locationApi';
import { useNavigate } from 'react-router-dom';

export default function Cadastrar() {

  const [hcaptchaToken, setHcaptchaToken] = useState<string>('');
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
  const navigate = useNavigate();

  const getAddress = async (lat: number, lng: number) => {
    try {
      const data = await getReverseGeocoding(lat, lng);
      setFormValues({
        ...formValues,
        address: data.address.road || '',
        city: data.address.city || '',
        state: data.address.state || '',
        country: data.address.country || '',
        latitude: lat,
        longitude: lng
      });

    } catch (error) {
      console.error('Erro ao obter endereço:', error);
    }
  }

  function onSubmit() {
    
    try {
      if (!hcaptchaToken) {
        toast({
          title: 'Erro ao cadastrar local',
          description: 'Por favor, verifique o captcha',
          color: 'red',
        });
        return;
      }

      if (formValues.name && formValues.address && formValues.city && formValues.state && formValues.country && formValues.whatsapp && formValues.latitude && formValues.longitude) {
        toast({
          title: 'Local de Treino Cadastrado',
          description: 'Seu local de treino foi cadastrado com sucesso',
          color: 'green',
        });
      }
      createLocation(formValues);

      setTimeout(() => {
        navigate('/localizacao');
      }, 2000);

      

    } catch (error) {
      console.error(error);
    }

  }

  if (!coords) {
    return <h1>Carregando Localização ...</h1>;
  }

  const MapClickEvent = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setFormValues({ ...formValues, latitude: lat, longitude: lng });
        await getAddress(lat, lng);
        console.log(formValues);
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

        </Section>

        <Section className='section flex flex-col gap-5'>
          Dados

          <InputStyled
            label="Nome do Local"
            name="name" placeholder="Ex: Centro de Treinamento de Breaking"
            value={formValues.name}
            onChange={setFormValues}
          />

          <InputStyled
            label="Informe o endereço completo"
            name="address" placeholder="Rua Sebastião Anunciato 99"
            value={formValues.address}
            onChange={setFormValues}

          />
          <InputStyled

            label="Informe a cidade"
            placeholder='Ex:Londrina'
            name="city"
            value={formValues.city}
            onChange={setFormValues}
          />
          <InputStyled
            label='Informe o numero de Telefone'
            name="whatsapp"
            placeholder="Ex: 11 99999-9999"
            value={formValues.whatsapp}
            onChange={setFormValues}
            type='tel'
            pattern='^\d{2} \d{5}-\d{4}$'
          />

        </Section>
        <RenamedCaptcha sitekey='b25a2b2a-c218-47fa-abb2-9a1a8942fb90'
          onVerify={(token: string) => {
            setHcaptchaToken(token);
          }}
        />
        <Button
          style={{
            marginTop: '1rem',
            backgroundColor: "#322153",
            color: "white",
          }}
          type='submit'>
          Cadastrar</Button>
      </Form>
    </Container>
  )
}

//TODO:ADICIONAR NUMERO DO LOCAL

