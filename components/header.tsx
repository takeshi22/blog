import styled from "@emotion/styled"

const baseColor = "#CF3721";
const HeaderContent = styled.header`
  // background: ${baseColor};
  text-align: left;
`;
const PageTitle = styled.h1`
  padding: 12px 20px 12px;
  // border-top: 4px solid ${baseColor};
  font-size: 28px;
  color: #fff;
  line-height: 1;
  border-bottom: 1px solid rgba(207, 55, 33, 0.1);
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