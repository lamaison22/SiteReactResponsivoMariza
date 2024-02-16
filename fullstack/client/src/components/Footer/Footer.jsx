import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logoAzul.png" alt="" width={120} />
          <span className="secondaryText">
            Nosso objetivo é fazer você <br />
            encontrar o melhor lugar.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">CRECI-SC 30283</span>
          <span className="secondaryText">Corretora de Imóveis</span>

          <span className="secondaryText">Chapecó SC</span>
        
        </div>
      </div>
    </div>
  );
};

export default Footer;
