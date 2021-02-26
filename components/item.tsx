import styled from "@emotion/styled";
import { getStrapiPath } from "../lib/api";

const Article = styled.article`
  width: 980px;
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
  .article-title {
    font-size: 18px;
  }
  time {
    font-size: 11px;
    color: #c9c9c9;
  }
`;

const Lead = styled.p`
  .lead {
    font-size: 13px;
    color: #767575;
  }
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

      <Lead className="lead">{lead}</Lead>

      {/* {renderContent(paragraph)} */}
    </Article>
  );
};

const renderContent = (content: string) => {
  const newContent =
    content &&
    content.replace(/src="\/uploads/g, `src="${getStrapiPath("uploads")}`);

  return (
    <div
      className="article-lead"
      dangerouslySetInnerHTML={{ __html: newContent }}
    />
  );
};

export default Item;
