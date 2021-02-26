import styled from "@emotion/styled"

const baseColor = "#CF3721";
const HeaderContent = styled.header`
  // background: ${baseColor};
  text-align: center;
`;
const PageTitle = styled.h1`
  padding-top: 12px;
  padding-bottom: 12px;
  border-top: 4px solid ${baseColor};
  font-size: 28px;
  color: #fff;
  line-height: 1;
  border-bottom: 1px solid #ccc;
  img{
    width: 240px;
  }
`;

const Header = () => {
  return (
    <HeaderContent><PageTitle><img src="/logo.svg" alt="たべっこ暮らし"/></PageTitle></HeaderContent>
  );
};

export default Header;