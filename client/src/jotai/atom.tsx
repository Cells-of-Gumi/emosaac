import { atom, createStore } from "jotai";

const mainStore = createStore();

const myInfo = atom<any>(null);

type emopickBookType = {
  title: string;
  bookId: number;
  typeCd: number;
  review: string;
  thumbnail: string;
};

const addedBookListAtom = atom<emopickBookType[]>([]);
const selectedBookListAtom = atom<emopickBookType[]>([]);

const addedBookIdListAtom = atom((get) =>
  get(addedBookListAtom).map((addedBook) => addedBook.bookId)
);
const selectedBookIdListAtom = atom((get) =>
  get(addedBookListAtom).map((addedBook) => addedBook.bookId)
);

// const readWriteAtom = atom(
//     (get) => get(priceAtom) * 2,
//     (get, set, newPrice) => {
//       set(priceAtom, newPrice / 2)
//       // set 로직은 원하는 만큼 지정할 수 있다.
//     }
//   )

export default mainStore;

export {
  myInfo,
  addedBookListAtom,
  selectedBookListAtom,
  addedBookIdListAtom,
  selectedBookIdListAtom,
};
