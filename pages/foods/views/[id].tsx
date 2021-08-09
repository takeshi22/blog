import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "date-fns";
import parse from "html-react-parser";
import { Food } from "../../index";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { vw } from "../../../lib/style";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}

const Detail = styled.div`
  padding-left: ${vw(42)};
  padding-right: ${vw(42)};
  .block{
    margin-top: 30px;
    ul {
      font-size: 13px;
    }
    li {
      position: relative;
      padding-left: 12px;
      &:before{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #000;
      }
    }
  }
`;
const DetailMain = styled.div`
  position: relative;
  margin-top: 20px;
  h2 {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: auto;
    width: 94%;
    font-size: 18px;
    background: #fff;
    text-align: center;
  }
  .title {
    display: block;
    font-size: 12px;
    color: #cf3721;
  }
`;
const Content = styled.div`
  h3 {
    font-size: 14;
    padding-bottom: 12px;
    line-height: 1;
    border-bottom: 2px solid #f1c3bd;
  }
  ul {
    list-style: disc;
    font-size: 12px;
  }
`;
const Incredients = styled.div`
  position: relative;
  margin-top: 60px;
  margin-bottom: 60px;
  border: 1px solid #cf3721;
  p {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    margin: auto;
    width: 20%;
    text-align: center;
    background: #fff;
  }
  ul {
    width: 72%;
    padding: ${vw(30)};
    display: flex;
    justify-content: space-between;
    li {
      position: relative;
      padding-left: 12px;
      &:before{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #000;
      }
    }
  }
`;

const ContentTitle = styled.h3`
  padding-bottom: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  border-bottom: 2px solid rgba(207, 55, 33, 0.3);
`;

const Views = ({ id }: Props) => {
  const [data, setData] = useState<Food>(null);

  useEffect(() => {
    axios
      .get(`http://tabecco.local/?rest_route=/wp/v2/foods/${id}&_embed`)
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Header />
      {data && (
        <Detail>
          <DetailMain>
            {data._embedded && data._embedded["wp:featuredmedia"] && (
              <img
                src={data._embedded["wp:featuredmedia"][0].source_url}
                alt=""
              />
            )}
            <h2>
              {data.title.rendered}
              <span className="title">{data.acf.enTitle}</span>
            </h2>
          </DetailMain>

          <Incredients className="incredients">
            <p>材料</p>
            {parse(data.acf.ingredients || "")}
          </Incredients>

          <div className="block">
            <ContentTitle>下準備</ContentTitle>
            {parse(data.acf.prepare || "")}
          </div>

          <div className="block">
            <ContentTitle>手順</ContentTitle>
            <Content>{parse(data.acf.content || "")}</Content>
          </div>
        </Detail>
      )}
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  return {
    props: { id },
  };
};

export default Views;
