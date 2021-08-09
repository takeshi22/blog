import styled from "@emotion/styled";
import { getStrapiPath } from "../lib/api";

const Article = styled.article`
  width: 100%;
  margin: 0 auto;
  figure {
    text-align: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 4px;
  .article-title {
    font-size: 16px;
  }
  time {
    font-size: 11px;
    color: #c9c9c9;
  }
`;

const Lead = styled.p`
  font-size: 13px;
  color: #767575;
`;

interface Props {
  url?: any;
  title: string;
  date?: string;
  lead?: string;
}

const Item = (props: Props) => {
  const { url, title, date, lead } = props;
  const path = url.startsWith("/")
    ? getStrapiPath(`${url.replace(/^\//, "")}`)
    : url;
  return (
    <Article>
      <figure>
        <img src={path} alt="" />
      </figure>

      <ArticleHeader>
        <h2 className="article-title">{title}</h2>
        <time dateTime={date}>{date}</time>
      </ArticleHeader>

      <Lead>{lead}</Lead>
    </Article>
  );
};

export default Item;
