/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import EmopickFloatingButton from "./EmopickFloatingButton";
import FixedModal from "../UI/FixedModal/FixedModal";
import EmopickSearchModalContent from "./EmopickSearchModalContent";

// {width?: string, height?: string, content: any, modalState: any, stateHandler: any, overflow?: string, forced?: boolean, blur?: boolean, isDarkMode?: boolean}

interface Props {
  // bookList?:
  //   | {
  //       title: string;
  //       bookId: number;
  //       typeCd: number;
  //       review: string;
  //       thumbnail: string;
  //     }[]
  //   | [];
  // setBookList: Dispatch<
  //   SetStateAction<
  //     {
  //       title: string;
  //       bookId: number;
  //       typeCd: number;
  //       review: string;
  //       thumbnail: string;
  //     }[]
  //   >
  // >;
  // selectedBookList:
  //   | {
  //       title: string;
  //       bookId: number;
  //       typeCd: number;
  //       review: string;
  //       thumbnail: string;
  //     }[]
  //   | [];
  // setSelectedBookList: Dispatch<
  //   SetStateAction<
  //     | {
  //         title: string;
  //         bookId: number;
  //         typeCd: number;
  //         review: string;
  //         thumbnail: string;
  //       }[]
  //     | []
  //   >
  // >;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const EmopickSearchModal = ({
  // bookList,
  // setBookList,
  // selectedBookList,
  // setSelectedBookList,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  return (
    <div>
      <FixedModal
        blur={true}
        modalState={isModalOpen}
        stateHandler={setIsModalOpen}
        content={
          <EmopickSearchModalContent
            // bookList={bookList}
            // setBookList={setBookList}
            // selectedBookList={selectedBookList}
            // setSelectedBookList={setSelectedBookList}
            setIsModalOpen={setIsModalOpen}
          />
        }
      />
    </div>
  );
};

export default EmopickSearchModal;
