/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";

interface Props {
  isSearchClicked?: boolean;
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  setSelectedBookList: Dispatch<
    SetStateAction<
      {
        title: string;
        bookId: number;
        typeCd: number;
        review: string;
        thumbnail: string;
      }[]
    >
  >;
  setBooks: Dispatch<SetStateAction<any[]>>;
}

export const EmopickSearchBarMobile = ({
  isSearchClicked,
  setIsSearchBoxOpen,
  searchInput,
  setSearchInput,
  setSelectedBookList,
  setBooks,
}: Props) => {
  const [isTagName, setIsTagName] = useState(false);
  function onChangeSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setBooks([]);
    const inputText = event.target.value;
    setSearchInput(inputText);
  }
  useEffect(() => {
    if (searchInput.slice(0, 1) === "#") {
      setIsTagName(true);
    } else {
      setIsTagName(false);
    }
    if (searchInput && searchInput.length > 0) {
      setIsSearchBoxOpen(true);
    } else {
      setIsSearchBoxOpen(false);
    }
  }, [searchInput]);
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
      />
    </div>
  );
};

const searchBarWrapCSS = css`
  position: relative;
  z-index: 20;
  display: grid;
  width: calc(100vw - 40px);
  margin: 0 20px;
  grid-template-columns: 20px 1fr;
  column-gap: 20px;
  height: 45px;
  background-color: var(--back-color-2);
  border-radius: 5px 5px 0 0;
  font-weight: bold;
  border-bottom: 1px solid var(--border-color);
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
