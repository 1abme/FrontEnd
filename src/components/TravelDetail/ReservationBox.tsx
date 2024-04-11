import { useNavigate } from "react-router-dom";
import CountBtn from "./CountBtn";
import { useEffect, useState } from "react";
import { ReservationBoxProps } from "../../types/reservation";
import { amountFormat } from "../../utils/amountFormat";
import { useRecoilValue } from "recoil";
import { loginCheck } from "../../atom/atom";

const ReservationBox = ({
  prices,
  maxCount,
  nowCount,
  info,
  productState,
  position,
}: ReservationBoxProps) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginCheck);
  const [counts, setCounts] = useState({
    adult: {
      count: 0,
      totalPrice: 0,
      price: prices[0].price + prices[0].surcharge ?? 0,
    },
    child: {
      count: 0,
      totalPrice: 0,
      price: prices[1].price + prices[1].surcharge ?? 0,
    },
    infant: {
      count: 0,
      totalPrice: 0,
      price: prices[2].price + prices[2].surcharge ?? 0,
    },
    totalPay: 0,
    totalCount: 0,
  });

  useEffect(() => {
    sessionStorage.setItem("counts", JSON.stringify(counts));
  }, [counts]);

  const handleCountChange = (
    age: "adult" | "child" | "infant",
    newCount: number
  ) => {
    setCounts((prev) => {
      const newTotalPrice = getPrice(age, newCount);
      const priceDifference = newTotalPrice - (prev[age]?.totalPrice || 0);
      const totalCount = prev.totalCount - prev[age].count + newCount;
      return {
        ...prev,
        [age]: {
          ...prev[age],
          count: newCount,
          totalPrice: newTotalPrice,
        },
        totalPay: prev.totalPay + priceDifference,
        totalCount: totalCount,
      };
    });
  };

  const handleReserve = () => {
    if (!isLogin) {
      const needLogin = confirm(
        "예약결제는 로그인이 필요합니다. 로그인하시겠습니까?"
      );
      if (needLogin) navigate("/login");
    } else {
      navigate("/reservation", {
        state: { productInfo: info, priceInfo: counts },
      });
      sessionStorage.removeItem("counts");
    }
  };

  const getPrice = (age: string, newCount: number) => {
    const priceInfo = prices.filter((item) => item.age === age);
    return newCount * (priceInfo[0].surcharge + priceInfo[0].price);
  };
  return (
    <div
      className={`flex flex-col items-center w-[250px] px-[18px] py-[22px] gap-[20px] 
    border-[1px] border-main-color rounded-[17px] text-sub-black h-fit max-xsm:gap-[8px] 
    ${position === "web" && "max-xsm:hidden"} select-none `}
    >
      {prices.map((item) => (
        <CountBtn
          key={item.age}
          age={item.age}
          label={item.label}
          price={item.price + item.surcharge}
          remainCount={maxCount - nowCount - counts.totalCount}
          onCountChange={handleCountChange}
          productState={productState}
        />
      ))}
      <div
        className="flex justify-between border-y-[1px] border-dashed 
      border-main-color w-full text-[20px] py-[15px] items-center"
      >
        <span className="font-bold text-main-color">총계</span>
        <span>{amountFormat(counts.totalPay)}원</span>
      </div>
      <button
        className="bg-main-color w-[198px] h-[59px] rounded-[19px] text-white
        disabled:bg-sub-black disabled:bg-opacity-[0.3]"
        disabled={counts["adult"].count < 1}
        onClick={handleReserve}
        onTouchStart={handleReserve}
      >
        {productState === "예약 가능" ? "예약하기" : productState}
      </button>
      {counts["adult"].count < 1 && (
        <span className="text-red-700 text-[10px]">
          성인1인 이상 포함필수입니다.
        </span>
      )}
      <div>
        현재 재고 {maxCount - nowCount - counts.totalCount}/{maxCount}
      </div>
    </div>
  );
};
export default ReservationBox;
