import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill, BsWhatsapp } from "react-icons/bs";
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'
import { AiOutlineFacebook, AiOutlineMail } from "react-icons/ai";
const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Nossos Contatos</span>
          <span className="primaryText">Entre em contato facilmente</span>
          <span className="secondaryText">
            Sempre prontos para ajudar a encontrar o imóvel do seus sonhos, não perca mais tempo e nos chame já! 
            {" "}
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsWhatsapp size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Whats</span>
                    <span className="secondaryText">49 999870276</span>
                  </div>
                </div>

                <button className="button" href>
                <a href="tel:49999870276"> Chamar </a>
              </button>
               
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <AiOutlineFacebook size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Facebook</span>
                    <span className="secondaryText">Mariza Lamaison</span>
                  </div>
                </div>
                <button className="button" href>
                <a href="https://www.facebook.com/mariza.lamaison">Chamar</a>
              </button>
              </div>
            </div>

            {/* second row */}
            
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./casa.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
