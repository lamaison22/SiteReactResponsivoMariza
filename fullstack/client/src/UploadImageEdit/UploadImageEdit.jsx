import React, { useEffect, useRef, useState } from "react";
import "./UploadImageEdit.css";
import { Button, Group } from "@mantine/core";
function UploadImageEdit({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) {
  const [imageURL, setImageURL] = useState([propertyDetails.image]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    if(alterar==true){
        setPropertyDetails((prev) => ({
            ...prev,
            image: imageURL,
          }));
          nextStep();
    }
    else{
    nextStep();

    }
  };
  const [alterar, setAlterar]=useState(false);


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
        console.log(result.info.files)
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
      <Button onClick={ ()=>setAlterar(true)} disabled={alterar==true}>
        Clique para alterar as imagens
      </Button>

      {alterar == true ? (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL[0][0]} alt="" />
        </div>
      ) : (
        console.log("")
      )}
       <Button onClick={handleNext}>Próximo</Button>
    </div>
  );
}

export default UploadImageEdit;
