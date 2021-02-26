import Head from "next/head";
import axios from "axios";
import { format } from "date-fns";
import Header from "../components/header";
import Item from "../components/item";
import { getStrapiPath } from "../lib/api";
import styled from "@emotion/styled";

const Ul = styled.ul`
  margin-top: 38px;
`

const Home = ({ foods, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Head>
        <title>たべっこ暮らし</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Ul>
        {foods.map(({ title, lead, published_at, thumbnail }, index) => (
          <li key={index}>
            <Item
              title={title}
              lead={lead}
              date={format(new Date(published_at), "yyyy/MM/dd")}
              url={thumbnail.formats.thumbnail.url}
            />
          </li>
        ))}
      </Ul>
    </>
  );
};

Home.getInitialProps = async () => {
  try {
    const path = getStrapiPath("foods");
    const res = await axios.get(path);
    return { foods: res.data };
  } catch (error) {
    return { error };
  }
};

export default Home;
