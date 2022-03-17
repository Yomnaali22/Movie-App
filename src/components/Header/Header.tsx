import React from "react";
//@ts-ignore
import RMDBLogo from "../../images/react-movie-logo.svg";
//@ts-ignore
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Link } from "react-router-dom";
//styles
import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header: React.FC = () => (
  <Wrapper>
    <Content>
      <Link to="/">
        <LogoImg src={RMDBLogo} alt="rmdb-logo" />
      </Link>
      <TMDBLogoImg src={TMDBLogo} alt="logo" />
    </Content>
  </Wrapper>
);

export default Header;
