/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

interface Props {
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

export const EmopickSearchBar = ({
  setIsSearchBoxOpen,
  searchInput,
  setSearchInput,
  setSelectedBookList,
  setBooks,
}: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isTagName, setIsTagName] = useState(false);
  useEffect(() => {
    if (searchInput.slice(0, 1) === "#") {
      setIsTagName(true);
    } else {
      setIsTagName(false);
    }
  }, [searchInput]);
  function onChangeSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setBooks([]);
    const inputText = event.target.value;
    setSearchInput(inputText);
    if (inputText && inputText.length > 0) {
      setIsSearchBoxOpen(true);
    } else {
      setIsSearchBoxOpen(false);
    }
  }
  return (
    <div css={searchBarWrapCSS({ isDeskTop, isTablet, isMobile })}>
      <div css={searchIconCSS}>
        <FiSearch />
      </div>
      <input
        type="text"
        placeholder="제목, 작가를 입력하세요."
        css={inputWrapCSS}
        value={searchInput}
        onChange={onChangeSearchInput}
        // onKeyDown={onEnterKeyDown}
      />
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const searchBarWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    position: relative;
    z-index: 20;
    display: grid;
    grid-template-columns: 20px 660px;
    column-gap: 20px;
    height: 45px;
    background-color: var(--back-color-2);
    border-radius: 5px 5px 0 0;
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
    & > input {
      color: var(--text-color);
      background-color: var(--back-color-2);
    }
    & > * {
      margin: auto 0;
    }
  `;
};

const searchIconCSS = css`
  & > * {
    margin-left: 14px;
  }
`;

const inputWrapCSS = css`
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--back-color);
  ::placeholder {
    font-weight: bold;
  }
`;
