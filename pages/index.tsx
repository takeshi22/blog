import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";
import Header from "../components/header";
import Item from "../components/item";
import { getStrapiPath } from "../lib/api";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Ul = styled.ul`
  margin-top: 38px;
  li {
    padding-bottom: 15px;
    border-bottom: 1px solid #cf3721;
    a {
      display: block;
      max-width: 400px;
      margin: 0 auto;
    }
  }
`;

type Title = {
  rendered: string;
};
type Embedded = {
  "wp:featuredmedia": Array<{ source_url: string }>;
};
type Acf = {
  content: string;
  enTitle: string;
  lead: string;
  prepare: string;
  ingredients: string;
};
export interface Food {
  id: string;
  date: string;
  lead: string;
  link: string;
  title: Title;
  foods_category: string[];
  _embedded: Embedded;
  acf: Acf;
}

const Home = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  useEffect(() => {
    axios
      .get("http://tabecco.local/?rest_route=/wp/v2/foods&_embed")
      .then((result) => {
        setFoods(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>たべっこ暮らし</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="content">
        <Ul>
          {foods.map(({ id, title, acf: { lead }, date, _embedded }, index) => (
            <li key={index}>
              <Link href={`/foods/views/${id}`}>
                <a>
                  <Item
                    title={title.rendered}
                    lead={lead}
                    date={format(new Date(date), "yyyy/MM/dd")}
                    {...(_embedded && _embedded["wp:featuredmedia"]
                      ? { url: _embedded["wp:featuredmedia"][0].source_url }
                      : {})}
                  />
                </a>
              </Link>
            </li>
          ))}
        </Ul>
      </div>
    </>
  );
};

export default Home;
