import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { validateString } from "../../utils/common";
import { toast } from "react-toastify";

function BasicDetails({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) {
  const form = useForm({
    initialValues: {
      title: propertyDetails?.title,
      description: propertyDetails?.description,
      price: propertyDetails?.price,
      type: propertyDetails?.type,
      faixa: propertyDetails?.faixa,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) => (value < 1000 ? "Deve ser mais que 1000 reais" : null),
    },
  });
  const { title, description, price, type } = form.values;

  function verificaFaixa(price){
    if (price<150000) {
      return "<150k"
    }
    else if(price>=150000 && price <=250000){
      return "150k-250k"
    }
    else if(price>250000 && price <=500000){
      return "250k-500k"
    }
    else if(price>500000 && price <=1000000){
      return "500k-1m"
    }
    else if(price > 1000000 && price<=2500000)
    return "1m-2.5m"
    else if(price>2500000){
      return ">2.5m"
    }
  }


  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      
      console.log(form);
      console.log("preco inserido: "+price)
      let faixa=verificaFaixa(price)
      console.log("faixa encaixada: "+faixa)

      setPropertyDetails((prev) => ({ ...prev, description, price, title,type,faixa }));
      console.log(propertyDetails)

      nextStep();
    } else {
      console.log("salamakdkao");
    }
  };

  return (
    <Box maw={"50%"} mx="auto" my={"md"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* left side */}
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          withAsterisk
          label="Descrição"
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Preço"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <Select
          label="Tipo de imóvel"
          placeholder="Selecione"
          searchable
          data={["Terreno", "Barracao", "Apartamento", "Casa", "Chácara","Terra","Sobrado"]}
          radius={"xl"}
          defaultValue={"Todas"}
          nothingFound="No options"
          {...form.getInputProps("type")}
          
        />
        
        {/* right side */}

        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Voltar
          </Button>
          <Button type="submit">Proxima Etapa</Button>
        </Group>
      </form>
      
    </Box>
  );

}

export default BasicDetails;
