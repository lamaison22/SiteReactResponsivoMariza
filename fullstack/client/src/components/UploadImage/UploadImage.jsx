import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
function UploadImage({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) {
  const [imageURL, setImageURL] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({
      ...prev,
      image: imageURL,
    }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "do88ydun6",
        uploadPreset: "jetk0san", //isso é do upload preset do cloudinary.com
        //para imagens lembrar de vir aq
        maxFiles: 3,
      },
      function (error, result) {


        let aux = new Array(result.info.files.length).fill("");
        let i = 0;
        result.info.files.forEach((element) => {
          aux[i] = element.uploadInfo.secure_url;
          i++;
        });

        if (result.event === "queues-end") {
          setImageURL(aux);
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          Enviar Imagem
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL[0]} alt="" />
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Voltar
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Proximo
        </Button>
      </Group>
    </div>
  );
}

export default UploadImage;
