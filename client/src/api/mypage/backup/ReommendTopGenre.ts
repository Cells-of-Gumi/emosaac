// import { defaultAxiosInstance } from "./../instance";
// type returnRecommendTopGenreProps = {
//   bookId: number;
//   platform: number;
//   thumbnail: string;
//   title: string;
//   author: string;
//   href: string;
//   score: number;
//   hit: number;
//   regist: string;
//   genreId: number;
//   genreName: string;
//   typeCd: number;
// };

// type RecommendTopGenreType = {
//   status: number;
//   message: string;
//   data: returnRecommendTopGenreProps;
// };

// async function getRecommendGenre(
//   isLike: number,
//   typeCode: number,
//   token: string | null
// ): Promise<returnRecommendTopGenreProps | null> {
//   const headers: any = {};
//   if (token) {
//     headers.Authorization = token;
//   }
//   try {
//     const { data }: { data: RecommendTopGenreType } =
//       await defaultAxiosInstance.get(
//         `/genres/total/one?isLike=${isLike}&typeCode=${typeCode}`,
//         { headers }
//       );
//     if (data.status === 200) {
//       return data.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     throw error;
//   }
// }
// export default getRecommendGenre;
