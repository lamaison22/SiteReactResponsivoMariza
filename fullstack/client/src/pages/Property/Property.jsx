import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import {
  FaBuilding,
  FaHome,
  FaMountain,
  FaShower,
  FaTree,
} from "react-icons/fa";
import { HiBuildingStorefront } from "react-icons/hi2";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { GiFamilyHouse } from "react-icons/gi";

import "./Property.css";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal.jsx";
import UserDetailContext from "../../Context/UserDetailsContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";
import EditPropertyModal from "../../components/EditPropertyModal/EditPropertyModal";
import DeletePropertyModal from "../../components/DeletePropertyModal/DeletePropertyModal.jsx";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { sliderSettings } from "../../utils/common.js";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";
function Property() {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery("resd", () => getProperty(id));
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Visita Cancelada", { position: "bottom-right" });
    },
  });

  function testaEmail() {
    if (user?.email === "marizalamaison22@gmail.com") {
      return true;
    } else return false;
  }
  const logado = testaEmail(user?.email);
  function testaTipoImovel(tipo) {
    // Use um switch case para verificar o tipo de imóvel
    console.log(tipo);
    switch (tipo) {
      case "Casa":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <FaHome size={20} color="#1F3E72" /> Casa
          </div>
        );
      case "Apartamento":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <FaBuilding size={20} color="#1F3E72" /> Apartamento
          </div>
        );
      case "Chácara":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <FaTree size={20} color="#1F3E72" /> Chácara
          </div>
        );
      case "Barracao":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <HiBuildingStorefront size={20} color="#1F3E72" /> Barracao
          </div>
        );
      case "Terreno":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <FaTree size={20} color="#1F3E72" /> Terreno
          </div>
        );

      case "Terra":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <FaMountain size={20} color="#1F3E72" /> Terra
          </div>
        );
      case "Sobrado":
        // Retorne uma div com o ícone e a string correspondentes
        return (
          <div>
            <GiFamilyHouse size={20} color="#1F3E72" /> Sobrado
          </div>
        );
      default:
        // Retorne uma div com uma mensagem de erro se o tipo de imóvel não for reconhecido
        return <div>Tipo de imóvel inválido</div>;
    }
  }

  if (isLoading) {
    {
      return (
        <div className="wrapper">
          <div className="flexCenter paddings">
            <PuffLoader />
          </div>
        </div>
      );
    }
  }
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Ocorreu um erro ao buscar a propriedade</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container ">
        <div className="like">
          <Heart id={id} />
        </div>
        {/* <img src={data?.image[0]} alt="home image" /> */}

       
        <div className="paddings innerWidth r-container">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30} // Espaço entre as imagens
            slidesPerView="auto" // Ocupar todo o espaço disponível
          >
            {data?.image.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Imagem ${index + 1}`} className="swiper-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
          
        <div className="flexCenter property-details">
          {/* esquerda da pagina */}

          <div className="flexColStart left">
            {/* cabeçalho */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                R${data?.price}
              </span>
            </div>

            {/* banheiros etc */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="1F3E72" />
                <span>{data?.facilities?.bathrooms} Banheiros</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Vagas de Garagem</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Quartos</span>
              </div>
              <div className="flexStart facility">
                {testaTipoImovel(data?.type)}
              </div>
            </div>
            {/* descricao */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* Endereço */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* Booking button */}

            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancelar Visita</span>
                </Button>
                <span>
                  Sua visita ja foi marcada para data{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <>
                <button
                  className="button"
                  onClick={() => {
                    validateLogin() && setModalOpened(true);
                  }}
                >
                  Agende sua Visita
                </button>
              </>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
            {logado && (
              <div className="flexStart botoesProperty">
                {/* botao editar propriedade */}
                <Button
                  variant="filled"
                  w={"100%"}
                  color="orange"
                  onClick={() =>
                    testaEmail(user?.email) &&
                    validateLogin() &&
                    setEditModal(true)
                  }
                >
                  Editar Propriedade
                </Button>
                <EditPropertyModal
                  opened={editModal}
                  setOpened={setEditModal}
                  email={user?.email}
                />
                {/* Botao deletar Propriedade */}
                <Button
                  variant="filled"
                  w={"100%"}
                  color="red"
                  onClick={() => validateLogin() && setDeleteModal(true)}
                >
                  Deletar Propriedade
                </Button>
                <DeletePropertyModal
                  opened={deleteModal}
                  setOpened={setDeleteModal}
                  email={user?.email}
                />
              </div>
            )}
          </div>

          {/* lado direito */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
