import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Header from "../../../components/header";
import { getStrapiPath } from "../../../lib/api";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Views = () => {
  const router = useRouter();
  const { id } = router.query;

  const path = getStrapiPath(`foods/${id}`);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios
      .get(path)
      .then((data) => setData(data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Header />

      {data && }
    </>
  );
};

export default Views;
