import WorldMap from "/public/worldmap.svg";
import WorldMapMb from "/public/worldmap_mb.svg";
import { useState } from "react";
import CountryImgs from "./CountryImgs";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";
import InfoImg from "./InfoImg";

const Map = () => {
  const viewSizeState = useRecoilValue(viewSize);
  const [showImg, setShowImg] = useState<string | null>(null);
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const ariaLabel = event.currentTarget.getAttribute("aria-label");
    setShowImg(() => ariaLabel);
  };
  const handleMouseOut = () => {
    setShowImg(null);
  };

  return (
    <div className="relative max-xsm:pb-[50px]">
      <div
        className="w-[850px] h-[425px] bg-[#FFE2B4] rounded-[40px] border border-dashed border-main-color overflow-hidden
    max-xsm:max-w-[342px] max-xsm:h-[217px] flex justify-center items-center relative select-none"
      >
        <img
          src={viewSizeState === "web" ? WorldMap : WorldMapMb}
          alt="worldmap"
          className="pb-[28px] max-xsm:pb-0 select-none"
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "australia"}
          country="australia"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[67%] right-[19.8%] max-xsm:top-[70%] max-xsm:right-[23%]"
          containerStyle={`top-[68%] right-[17.5%] max-xsm:top-[70%] max-xsm:right-[18%] 
          ${viewSizeState === "web" && "flex-col"}`}
          islabelFirst={!(viewSizeState === "web")}
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "easternEurope"}
          country="easternEurope"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[16%] right-[28.5%] max-xsm:top-[5%] max-xsm:right-[30%]"
          containerStyle="top-[26.5%] right-[31%] max-xsm:top-[17%] max-xsm:right-[30%]"
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "franswiss"}
          country="franswiss"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[19.5%] right-[40%] max-xsm:top-[6%] max-xsm:right-[50%]"
          containerStyle={`top-[29.5%] right-[40%] max-xsm:top-[19%] max-xsm:right-[48%] 
          ${viewSizeState === "mobile" && "flex-col"}`}
          islabelFirst={!(viewSizeState === "web")}
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "italy"}
          country="italy"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[35%] right-[38.3%] max-xsm:top-[29%] max-xsm:right-[40%]"
          containerStyle="top-[36.3%] right-[44.2%] flex-col max-xsm:top-[33.5%] max-xsm:right-[46%]"
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "canada"}
          country="canada"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[23%] right-[74%] max-xsm:top-[11%] max-xsm:right-[78%]"
          containerStyle="top-[28.5%] right-[66.5%] max-xsm:top-[24%] max-xsm:right-[77%]"
          islabelFirst={viewSizeState === "web"}
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "newzealand"}
          country="newzealand"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[64.5%] right-[2.5%] max-xsm:top-[80%] max-xsm:right-[5%]"
          containerStyle="top-[76.5%] right-[2.5%] max-xsm:top-[77%] max-xsm:right-[1.5%]"
          islabelFirst={!(viewSizeState === "web")}
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "southeastAsia"}
          country="southeastAsia"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[49.3%] right-[13.3%] max-xsm:top-[43%] max-xsm:right-[5%]"
          containerStyle="top-[56%] right-[18%] max-xsm:top-[54%] max-xsm:right-[10%]"
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "spain"}
          country="spain"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[26.5%] right-[59.2%] max-xsm:top-[27%] max-xsm:right-[66%]"
          containerStyle="top-[37.5%] right-[51.6%] max-xsm:top-[32%] max-xsm:right-[58.5%]"
          islabelFirst={true}
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "taiwan"}
          country="taiwan"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[32%] right-[24%] max-xsm:top-[26%] max-xsm:right-[21%]"
          containerStyle="top-[43.8%] right-[21.8%] max-xsm:top-[41%] max-xsm:right-[18%]"
          islabelFirst={true}
        />
        <CountryImgs
          showImg={viewSizeState === "web" ? showImg : "kidzania"}
          country="kidzania"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[67%] right-[78%] max-xsm:top-[80%] max-xsm:right-[56%]"
          containerStyle={`top-[60%] right-[78%] max-xsm:top-[65%] max-xsm:right-[56%] 
          ${viewSizeState === "mobile" && "flex-col"}`}
          islabelFirst={viewSizeState === "web"}
        />
      </div>
      <InfoImg showImg={showImg} viewSizeState={viewSizeState} />
    </div>
  );
};
export default Map;
