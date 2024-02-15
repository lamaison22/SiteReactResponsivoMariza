import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../../Facilities/Facilities";
import { useDisclosure } from '@mantine/hooks';
import { getProperty } from "../../utils/api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import UploadImageEdit from "../../UploadImageEdit/UploadImageEdit";

function EditPropertyModal({opened, setOpened, email }) {
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];
    const [active,setActive]=useState(0)
    const { data, isLoading, isError } = useQuery("resd", () => getProperty(id));

    const [opnede, { open, close }] = useDisclosure(false);
    const {user}=useAuth0()
    const [propertyDetails,setPropertyDetails]=useState({
        id:data?.id,
        title: data?.title,
        description: data?.description,
        price: data?.price,
        country: data?.country,
        city: data?.city,
        type:data?.type,
        address: data?.address,
        image:data?.image,
        facilities:{
            bedrooms:data?.facilities.bedrooms,
            parkings:data?.facilities.parkings,
            bathrooms:data?.facilities.bathrooms,
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
            {console.log("log no editar prop "+propertyDetails)}
          </Stepper.Step>
          <Stepper.Step label="Imagens" description="Enviar Imagens">
            <UploadImageEdit prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
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

export default EditPropertyModal;
