import PutUserInfo from "@/components/mypage/PutUserInfo";

export default function edit({ myInfo }: any) {
  console.log(myInfo);
  return (
    <>
      <PutUserInfo myInfo={myInfo} />
    </>
  );
}
