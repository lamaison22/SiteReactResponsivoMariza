import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../../Facilities/Facilities";
import { useDisclosure } from '@mantine/hooks';

function AddPropertyModal({ opened, setOpened }) {

    const [active,setActive]=useState(0)
    const [op, { open, close }] = useDisclosure(false);
    const {user}=useAuth0()
    const [propertyDetails,setPropertyDetails]=useState({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        type:"",
        faixa: 0,
        image:[],
        facilities:{
            bedrooms:0,
            parkings:0,
            bathrooms:0,
        },
        userEmail:user?.email
    })

    const nextStep=()=>{
        setActive((current)=>current<4?current+1:current)
    }
    const prevStep=()=>{
        setActive((current)=>current>0?current-1:current)
    }
  return (
    <Modal
      opened={opened}
      onClose={()=>setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Localização" description="Insira o endereço">
            <AddLocation nextStep={nextStep} propertyDetails={propertyDetails}setPropertyDetails={setPropertyDetails}/>
          </Stepper.Step>
          <Stepper.Step label="Imagens" description="Enviar Imagens">
            <UploadImage prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Infos" description="Detalhe">
            <BasicDetails nextStep={nextStep} propertyDetails={propertyDetails}setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>

          <Stepper.Step label="Quartos Garagens e Banheiros" description="Informe o numero de cada">
                <Facilities prevStep={prevStep} propertyDetails={propertyDetails}setPropertyDetails={setPropertyDetails} setOpened={setOpened} setActiveStep={setActive}/>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
}

export default AddPropertyModal;
