import MyPage from "@/components/mypage/MyPage";

export default function mypage({ myInfo }: any) {
  // console.log(myInfo);
  return (
    <>
      <MyPage myInfo={myInfo} />
    </>
  );
}
