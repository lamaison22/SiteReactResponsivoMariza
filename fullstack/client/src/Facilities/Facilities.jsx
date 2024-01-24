import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../Context/UserDetailsContext";
import useProperties from "../hooks/useProperties";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency, updateResidency } from "../utils/api";
function Facilities({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) {
  let editar = false;
  const { user } = useAuth0();
  const email = user.email.toString();
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails?.facilities?.bedrooms,
      parkings: propertyDetails?.facilities?.parkings,
      bathrooms: propertyDetails?.facilities?.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Deve ter ao menos um quarto" : null),
      bathrooms: (value) =>
        value < 1 ? "Deve ter ao menos um banheiro" : null,
    },
  });
  console.log(propertyDetails);
  if (propertyDetails.facilities.bedrooms != 0) {
    editar = true;
  }
  console.log("editar " + editar);
  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
        userEmail: email,
      }));
      if(editar==false){
      criarNovo();

        }
        else if(editar==true){
          console.log("entrou editar")
          editarNovo()
        }
    }
  };

  //logica de envio de imagem

  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { refetch: refetchProperties } = useProperties();

  const { mutate:editarNovo, isCarregando } = useMutation({
    mutationFn: () =>
      updateResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
          userEmail: email,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Alterado com sucesso", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        type: "",
        faixa:"",
        address: "",
        image: [],
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email.toString(),
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  const { mutate:criarNovo, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
          userEmail: email,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Adicionado com sucesso", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        type: "",
        faixa:"",
        address: "",
        image: [],
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email.toString(),
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw={"30%"} mx="auto" my={"sm"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* left side */}
        <NumberInput
          withAsterisk
          label="Num de Quartos"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          withAsterisk
          label="Num de Garagens"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="Num de Banheiros"
          min={0}
          {...form.getInputProps("bathrooms")}
        />

        {/* right side */}

        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Voltar
          </Button>
          {editar == false ? (
            <>
              <Button type="submit" color="green" disabled={isLoading}>
                {isLoading ? "Enviando" : "Adicionar Propriedade"}
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" color="green" disabled={isCarregando}>
                {isCarregando ? "Editando" : "Editar Propriedade"}
              </Button>
            </>
          )}
          
        </Group>
      </form>
    </Box>
  );
}

export default Facilities;
