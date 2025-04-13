import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import { useEffect, useState } from "react";
import MenuMobile from "@/components/home/MenuMobile/MenuMobile";
import Header from "@/components/shared/header/Header";
import Footer2 from "@/components/shared/Footer/Footer2";
import { useGetAllCategoriesQuery } from "@/redux/features/allApis/categoryApi/categoryApi";
import { useGetAllSubCategoriesQuery } from "@/redux/features/allApis/categoryApi/subCategoryApi";

const MainLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { data: allCategories } = useGetAllCategoriesQuery();
  const { data: allSubCategories } = useGetAllSubCategoriesQuery();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideCommonComponents = isMobile && location.pathname === "/register";
  // const menuItems = [
  //   {
  //     name: " হোম ",
  //     path: "/",
  //     icon: menu1,
  //   },
  //   {
  //     name: "এক্সক্লুসিভ",
  //     icon: menu2,
  //     images: [
  //       { src: tab1Image1 },
  //       { src: tab1Image2 },
  //       { src: tab1Image3 },
  //       { src: tab1Image4 },
  //     ],
  //   },
  //   {
  //     name: "স্পোর্ট",
  //     icon: menu3,
  //     images: [
  //       { src: tab2Image1, name: "এক্সচেঞ্জ" },
  //       { src: tab2Image2, name: "I-Sports" },
  //       { src: tab2Image3, name: "SBO-Sports" },
  //       { src: tab2Image4, name: "E1Sports" },
  //       { src: tab2Image5, name: "ঘোড়া বই" },
  //       { src: tab2Image6, name: "BTI-Sports" },
  //       { src: tab2Image7, name: "Fantasy" },
  //       { src: tab2Image8, name: "NST" },
  //       { src: tab2Image9, name: "CMD.sports" },
  //     ],
  //   },
  //   {
  //     name: "ক্যাসিনো",
  //     icon: menu4,
  //     images: [
  //       {
  //         src: tab3Image1,
  //         name: "Evolution",
  //         link: "/casino#Evolution",
  //         gameImages: [
  //           casinoImages1,
  //           casinoImages2,
  //           casinoImages3,
  //           casinoImages4,
  //           casinoImages5,
  //           casinoImages6,
  //         ],
  //       },
  //       {
  //         src: tab3Image2,
  //         name: "sexy",
  //         link: "/casino#sexy",
  //         gameImages: [
  //           casinoImages7,
  //           casinoImages8,
  //           casinoImages9,
  //           casinoImages10,
  //           casinoImages11,
  //           casinoImages12,
  //         ],
  //       },
  //       {
  //         src: tab3Image3,
  //         name: "Pragmatic-Play",
  //         link: "/casino#Pragmatic-Play",
  //         gameImages: [casinoImages13, casinoImages14, casinoImages15],
  //       },

  //       {
  //         src: tab3Image4,
  //         name: "Playtech",
  //         link: "/casino#Playtech",
  //         gameImages: [casinoImages16, casinoImages17, casinoImages18],
  //       },

  //       {
  //         src: tab3Image5,
  //         name: "Microgaming",
  //         link: "/casino#Microgaming",
  //         gameImages: [casinoImages19, casinoImages20, casinoImages21],
  //       },

  //       {
  //         src: tab3Image6,
  //         name: "HotRoad",
  //         link: "/casino#HotRoad",
  //         gameImages: [casinoImages22, casinoImages23, casinoImages24],
  //       },

  //       {
  //         src: tab3Image7,
  //         name: "BG",
  //         link: "/casino#BG",
  //         gameImages: [casinoImages25, casinoImages26, casinoImages27],
  //       },

  //       {
  //         src: tab3Image8,
  //         name: "Dream-Gaming",
  //         link: "/casino#Dream-Gaming",
  //         gameImages: [casinoImages28, casinoImages29, casinoImages30],
  //       },
  //       {
  //         src: tab3Image9,
  //         name: "Via-Casino",
  //         link: "/casino#Via-Casino",
  //         gameImages: [casinoImages31, casinoImages32, casinoImages33],
  //       },
  //     ],
  //   },
  //   {
  //     name: "স্লট",
  //     icon: menu5,
  //     images: [
  //       {
  //         src: tab4Image1,
  //         name: "JILI",
  //         link: "/slot#JILI",
  //         gameImages: [slotImage1, slotImage2, slotImage3],
  //       },

  //       {
  //         src: tab4Image2,
  //         name: "JDB",
  //         link: "/slot#JDB",
  //         gameImages: [slotImage4, slotImage5, slotImage6],
  //       },

  //       {
  //         src: tab4Image3,
  //         name: "PG-soft",
  //         link: "/slot#PG-soft",
  //         gameImages: [slotImage7, slotImage8, slotImage9],
  //       },

  //       {
  //         src: tab4Image4,
  //         name: "Spadegaming",
  //         link: "/slot#Spadegaming",
  //         gameImages: [slotImage10, slotImage11, slotImage12],
  //       },
  //       {
  //         src: tab4Image5,
  //         name: "Yellow-Bat",
  //         link: "/slot#Yellow-Bat",
  //         gameImages: [slotImage13, slotImage14, slotImage15],
  //       },

  //       {
  //         src: tab4Image6,
  //         name: "Fa-Chai",
  //         link: "/slot#Fa-Chai",
  //         gameImages: [slotImage16, slotImage17, slotImage18],
  //       },

  //       {
  //         src: tab4Image7,
  //         name: "Red-Tiger",
  //         link: "/slot#Red-Tiger",
  //         gameImages: [slotImage19, slotImage20, slotImage21],
  //       },

  //       {
  //         src: tab4Image8,
  //         name: "Fastspin ",
  //         link: "/slot#Fastspin",
  //         gameImages: [slotImage22, slotImage23, slotImage24],
  //       },

  //       {
  //         src: tab3Image3,
  //         name: "Pragmatic-Play",
  //         link: "/slot#Pragmatic-play",
  //       },
  //       { src: tab4Image10, name: "Rich88", link: "/slot#Rich88" },
  //       { src: tab3Image4, name: "Playtech", link: "/slot#Playtech" },
  //       { src: tab3Image5, name: "Microgaming", link: "/slot#Microgaming" },
  //       { src: tab4Image11, name: "Play8", link: "/slot#play8" },
  //       { src: tab4Image12, name: "WorldMatch", link: "/slot#WorldMatch" },
  //       { src: tab4Image13, name: "CQ9", link: "/slot#CQ9" },
  //       { src: tab4Image14, name: "LadyLuck", link: "/slot#LadyLuck" },
  //     ],
  //   },
  //   {
  //     name: "টেবিল",
  //     icon: menu6,
  //     images: [
  //       { src: tab4Image1, name: "JILI" },
  //       { src: tab5Image2, name: "King Maker" },
  //       { src: tab4Image10, name: "Rich88" },
  //       { src: tab5Image4, name: "Spribe" },
  //       { src: tab4Image3, name: "PG soft" },
  //       { src: tab4Image12, name: "WorldMatch" },
  //       { src: tab4Image13, name: "CQ9" },
  //       { src: tab5Image8, name: "PLAY'N GO " },
  //       { src: tab5Image9, name: "Ludo" },
  //       { src: tab5Image10, name: "PokerWin" },
  //     ],
  //   },
  //   {
  //     name: "ক্র্যাশ",
  //     icon: menu7,
  //     images: [
  //       { src: tab5Image4, name: "Spribe" },
  //       { src: tab4Image1, name: "JILI" },
  //       { src: tab3Image3, name: "Pragmatic Play" },
  //       { src: tab4Image6, name: "Fa Chai" },
  //       { src: tab4Image10, name: "Rich88" },
  //       { src: tab5Image2, name: "King Maker" },
  //     ],
  //   },
  //   {
  //     name: "ফিসিং",
  //     icon: menu8,
  //     images: [
  //       { src: tab4Image1, name: "JILI" },
  //       { src: tab4Image2, name: "JDB" },
  //       { src: tab3Image7, name: "BG" },
  //       { src: tab4Image6, name: "Fa Chai" },
  //       { src: tab4Image5, name: "Yellow Bat" },
  //       { src: tab4Image13, name: "CQ9" },
  //       { src: tab8Image7, name: "Lucky365" },
  //       { src: tab8Image8, name: "Joker" },
  //     ],
  //   },
  //   {
  //     name: "আর্কেড",
  //     icon: menu9,
  //     images: [
  //       { src: tab4Image2, name: "JDB" },
  //       { src: tab4Image6, name: "Fa Chai" },
  //       { src: tab4Image10, name: "Rich88" },
  //       { src: tab4Image13, name: "CQ9" },
  //       { src: tab4Image3, name: "PG soft" },
  //       { src: tab8Image7, name: "Lucky365" },
  //     ],
  //   },
  //   {
  //     name: "লটারী",
  //     icon: menu10,
  //     images: [
  //       { src: tab4Image1, name: "JILI" },
  //       { src: tab4Image5, name: "Yellow Bat" },
  //       { src: tab8Image8, name: "Joker" },
  //       { src: tab5Image2, name: "King Maker" },
  //       { src: tab10Image5, name: "Number" },
  //     ],
  //   },
  //   { name: "প্রমোশন", path: "/promotion", icon: menu11, images: [] },
  //   { name: "রেফারেল প্রোগ্রাম", path: "/promotion", icon: menu12, images: [] },
  //   { name: "VIP ক্লাব", path: "/promotion", icon: menu13, images: [] },
  //   { name: "অ্যাফিলিয়েট", path: "/promotion", icon: menu14, images: [] },
  //   { name: "২৪/৭ লাইভচ্যাট", path: "/promotion", icon: menu15, images: [] },
  //   { name: "ফোরাম", path: "/promotion", icon: menu16, images: [] },
  //   {
  //     name: "ব্র্যান্ড অ্যাম্বাসেডর",
  //     path: "/promotion",
  //     icon: menu17,
  //     images: [],
  //   },
  // ];
  const menuItems = allCategories?.map((category) => ({
    ...category,
    subCategories: allSubCategories?.filter(
      (subCat) => subCat.category === category.name
    ),
  }));
  return (
    <>
      <div className="relative hidden md:block">
        {!hideCommonComponents && <Navbar menuItems={menuItems} />}
        <Outlet context={{ menuItems }} />
        {!hideCommonComponents && <Footer />}
        {!hideCommonComponents && <MenuMobile />}
      </div>
      <div className="relative block md:hidden">
        <Header menuItems={menuItems} />
        <main>
          <Outlet context={{ menuItems }} />
        </main>
        <Footer2 />
        {/* <MobileColar /> */}
        <MenuMobile />
      </div>
    </>
  );
};

export default MainLayout;
