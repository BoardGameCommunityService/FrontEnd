import Header from "@/components/common/Header";
import Banner from "@/components/common/Banner";
import Calendar from "@/components/common/Calendar";
import CardList from "@/components/common/CardList";
import Link from "next/link";

import plusIcon from "../../public/icons/ic_plus.svg";
import bottomLogo from "../../public/bottomLogo.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-[375px] h-full  flex flex-col items-center bg-[#F5F6FA] relative">
        <Header />
        <main>
          <section>
            <Banner />
          </section>
          <section>
            <Calendar />
          </section>
          <section>
            <CardList />
          </section>
          <div className="flex justify-center mt-6 mb-[60px]">
            <Image
              src={bottomLogo}
              alt="함께하면 더 즐거운 보드게임 라이프!"
              width={120}
              height={110}
              className="mt-6 mb-[60px]"
            />
          </div>
        </main>
        <Link href="/board/new">
          <div className="fixed bottom-10 right-[max(20px,calc(50%-167.5px))] w-[123px] h-12 rounded-[40px] py-3 pl-3 pr-4 bg-[#06E393] shadow-[0px_4px_16px_0px_#00000040]">
            <div className="flex gap-1 items-center">
              <Image src={plusIcon} alt="" width={18} height={18} />
              <span className="font-semibold text-[16px] text-[#161616]">모임만들기</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
