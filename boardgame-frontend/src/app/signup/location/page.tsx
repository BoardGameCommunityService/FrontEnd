import Image from "next/image";
import Link from "next/link";
import TextInput from '../components/TextInput';
export default function Signup() {
  return (
    <div className="mt-[84px] mx-[20px]">
        <Link href="/signup">
          <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </Link>
        <h2 className="mt-4 font-semibold text-2xl text-[#161616]">활동 지역을 선택해주세요</h2>

      <form action="/signup/location">
        <TextInput label="활동지역" name="userLocation" placeholder="지역구를 입력해주세요.(ex.강남구, 서초구)" isHidden={true}  />
        <button type="submit" className="mt-6 w-full p-3 bg-[#161616] text-white rounded-xl text-sm font-medium">검색</button>
      </form>

      <div className='mt-6 text-[#999999]'>
        <h3 className='text-xs'>검색 결과</h3>
        <ul>
          <li className='my-3 text-[#161616]'>
            <button>서울특별시 강남구</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
