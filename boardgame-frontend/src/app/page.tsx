import Header from "@/components/common/Header";
import Banner from "@/components/common/Banner";
import Calendar from "@/components/common/Calendar";
import CardList from "@/components/common/CardList";
import Link from "next/link";


export default function Home() {
  return (
    <div>
        

          <Header/>
          <main>
            <section>
              <Banner/>
            </section>
            <section>
              <Calendar/>
            </section>
            <section>
              <CardList/>
            </section>
            <Link href="/board/new">+ 모임만들기</Link>
          </main>
    </div>
  );
}
