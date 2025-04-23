import CardsRow from "@/components/home/cards-row";
import TopSlider from "@/components/home/top-slider";

export default function Home() {
  return (
    <main>
      <TopSlider />
      <div className="px-5 pt-10 pb-50 space-y-10">
        <CardsRow title="Phim chiếu rạp mới" type_list="phim-le" page={1} sort_field="modified.time" sort_type="desc" year={0} limit={15} sort_lang={""} category={""} country={""}/>
        <CardsRow title="Phim truyền hình mới" type_list="phim-bo" page={1} sort_field="modified.time" sort_type="desc" year={0} limit={15} sort_lang={""} category={""} country={""}/>
        <CardsRow title="Phim hoạt hình mới" type_list="hoat-hinh" page={1} sort_field="modified.time" sort_type="desc" year={0} limit={15} sort_lang={""} category={""} country={""}/>
        <CardsRow title="Gameshow truyền hình thực tế" type_list="tv-shows" page={1} sort_field="modified.time" sort_type="desc" year={0} limit={15} sort_lang={""} category={""} country={""}/>
      </div>
    </main>
  );
}
