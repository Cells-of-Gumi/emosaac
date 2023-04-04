/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";

interface Props {
  isSearchClicked?: boolean;
  setIsSearchBoxOpen?: Dispatch<SetStateAction<boolean>>;
}

export const SearchBarMobile = (props: Props) => {
  const router = useRouter();
  const typeDict: { [key: string]: string } = {
    ["전체"]: "total",
    ["웹툰"]: "webtoon",
    ["웹소설"]: "novel",
  };
  const type = "total";
  const [searchInput, setSearchInput] = useState("");
  const [isTagName, setIsTagName] = useState(false);
  function onChangeSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value;
    setSearchInput(inputText);
  }
  function onEnterKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (searchInput === "") {
        alert("검색어를 입력해주세요");
      } else {
        const [prevId, prevScore, size] = [20493, 10, 10];
        props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(false);
        if (isTagName) {
          const tagName = searchInput.slice(1);
          router.push({
            pathname: `/search/tagname`,
            query: {
              type,
              query: tagName,
            },
          });
          setSearchInput("");
        } else {
          const content = searchInput;
          router.push({
            pathname: `/search/content`,
            query: {
              type,
              query: content,
            },
          });
          setSearchInput("");
        }
      }
    }
  }
  function onClickSearch() {
    if (searchInput === "") {
      // props.setIsSearchBoxOpen(false);
    } else {
      const [prevId, prevScore, size] = [20493, 10, 10];
      props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(false);
      console.log("여기옴?");
      console.log("여기옴?");
      if (isTagName) {
        const tagName = searchInput.slice(1);
        router.push({
          pathname: `/search/tagname`,
          query: {
            type,
            query: tagName,
          },
        });
        setSearchInput("");
      } else {
        const content = searchInput;
        router.push({
          pathname: `/search/content`,
          query: {
            type,
            query: content,
          },
        });
        setSearchInput("");
      }
    }
  }
  useEffect(() => {
    if (searchInput.slice(0, 1) === "#") {
      setIsTagName(true);
    } else {
      setIsTagName(false);
    }
  }, [searchInput]);
  useEffect(() => {
    if (props.isSearchClicked) {
      onClickSearch();
    }
  }, [props.isSearchClicked]);
  return (
    <div css={searchBarWrapCSS}>
      <div css={searchIconCSS}>
        <FiSearch />
      </div>
      <input
        type="text"
        placeholder="제목, 작가를 입력하세요."
        css={inputWrapCSS}
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyDown={onEnterKeyDown}
      />
    </div>
  );
};

const searchBarWrapCSS = css`
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 20px;
  height: 45px;
  background-color: var(--back-color-2);
  border-radius: 5px;
  font-weight: bold;
  & > input {
    color: var(--text-color);
  }
  & > * {
    margin: auto 0;
  }
`;

const searchIconCSS = css`
  & > * {
    margin-left: 14px;
  }
`;

const inputWrapCSS = css`
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--back-color-2);
  ::placeholder {
    font-weight: bold;
  }
`;
