import React, { useContext, useState } from "react";
import { deleteResidency, getProperty } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Modal } from "@mantine/core";
import "./DeletePropertyModal.css";
import useProperties from "../../hooks/useProperties";
import UserDetailContext from "../../Context/UserDetailsContext";
import { toast } from "react-toastify";

function DeletePropertyModal({ opened, setOpened }) {
  const { pathname } = useLocation();
 
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery("resd", () => getProperty(id));

  const { user } = useAuth0();
  const [propertyDetails, setPropertyDetails] = useState({
    id: data?.id,
    title: data?.title,
    description: data?.description,
    price: data?.price,
    country: data?.country,
    city: data?.city,
    type: data?.type,
    address: data?.address,
    image: data?.image,
    facilities: {
      bedrooms: data?.facilities.bedrooms,
      parkings: data?.facilities.parkings,
      bathrooms: data?.facilities.bathrooms,
    },
    userEmail: user?.email,
  });

  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();
  const navigate=useNavigate()
  const handleDelete = () => {
      deleteResidency(propertyDetails,token)
      
      setOpened(false)
      navigate("/properties",{replace:true})
      toast.success("Deletado com sucesso", { position: "bottom-right" });
      refetchProperties()  


    }
  
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"40rem"}
    >
      <Container h={"20rem"} w={"100%"}>
        <div className="flexCenter opcoes">
          <span>Você tem certeza que deseja deletar essa propriedade?</span>
          <div className="flexStart botoes">
            <Button className="selecao" color="red" onClick={()=>handleDelete()}> Deletar </Button>
            <Button  className="selecao" color="yellow" > Cancelar </Button>
          </div>
        </div>
      </Container>
    </Modal>
  );
}

export default DeletePropertyModal;
