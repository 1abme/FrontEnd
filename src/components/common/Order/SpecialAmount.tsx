import { useEffect, useState } from "react";
import OrderDetailBtn from "./OrderDetailBtn";
import TableHeader from "./TableHeader";
import ManagerTitle from "../../Manager/ManagerTitle";
import CustomRadioBtn from "../CustomRadionbtn";
import usePostSpecialAmount from "../../../queries/orders/usePostSpecialAmount";
import { onlyNumber } from "../../../utils/validationUtils";

const SpecialAmount = ({
  orderId,
  orderState,
  totalPrice,
}: {
  orderId: string;
  orderState: string;
  totalPrice: number;
}) => {
  const [editAmount, setEditAmount] = useState(false);
  const [amountType, setAmountType] = useState("추가금");
  const [amount, setAmount] = useState({
    imomOrderId: "",
    additionalPrice: 0,
    memo: "",
  });

  const { mutate } = usePostSpecialAmount(amount);

  useEffect(() => {
    if (orderId) {
      setAmount((prev) => ({
        ...prev,
        imomOrderId: orderId,
      }));
    }
  }, [orderId]);

  const handleAmount = (role?: string) => {
    if (role) {
      if (role === "submit") mutate();
      if (role === "cancel")
        setAmount({ imomOrderId: "", additionalPrice: 0, memo: "" });
    }
    setEditAmount(!editAmount);
  };

  const handleInput = (id: string, value: string | number) => {
    if (amountType === "할인금" && id === "additionalPrice" && +value >= 0) {
      if (+value <= totalPrice)
        setAmount((prev) => ({ ...prev, [id]: -value }));
      else alert("할인금은 총 금액을 초과할 수 없습니다.");
    } else {
      setAmount((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAmountType = (id: string, value: string) => {
    if (id) {
      setAmountType(value);
      if (amountType !== value) {
        if (value === "할인금") {
          if (+amount.additionalPrice <= totalPrice) {
            setAmount((prev) => ({
              ...prev,
              additionalPrice: amount.additionalPrice * -1,
            }));
          } else alert("할인금은 총 금액을 초과할 수 없습니다.");
          return;
        }
        if (value === "추가금") {
          setAmount((prev) => ({
            ...prev,
            additionalPrice: Math.abs(amount.additionalPrice),
          }));
        }
      } else {
        return;
      }
    }
  };

  const strLengthLimit = (str: string, limit: number) => {
    return str.slice(0, limit);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center w-full justify-between">
        <ManagerTitle title="추가금 / 할인금" style="mb-[12px] flex w-fit" />
        <div className="flex gap-[12px]">
          {orderState !== "취소" && (
            <>
              {editAmount ? (
                <>
                  <OrderDetailBtn
                    label="작성완료"
                    role={"submit"}
                    handleClick={handleAmount}
                    disabled={false}
                  />
                  <OrderDetailBtn
                    label="작성취소"
                    role={"cancel"}
                    handleClick={handleAmount}
                    disabled={false}
                  />
                </>
              ) : (
                <OrderDetailBtn
                  label="추가금 / 할인금 작성하기"
                  handleClick={handleAmount}
                  disabled={false}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex w-full items-center border-y border-sub-black gap-[24px]">
          <TableHeader category={"금액"} header={true} />
          <div className="flex gap-[4px]">
            <span>{amountType === "추가금" ? "+" : "-"}</span>
            <input
              className="flex shrink-0 w-fit disabled:bg-transparent"
              disabled={!editAmount}
              value={Math.abs(amount.additionalPrice)}
              size={`${amount.additionalPrice}`.length + 1}
              id="additionalPrice"
              onChange={(e) =>
                handleInput(e.target.id, onlyNumber(e.target.value))
              }
            />
            <label htmlFor="additionalPrice">원</label>
          </div>
        </div>
        <div className="flex w-full border-y border-sub-black gap-[24px]">
          <TableHeader category={"추가금 / 할인금"} header={true} />
          <div className="flex gap-[20px]">
            <CustomRadioBtn
              label="추가금"
              id="추가금"
              checked={amountType === "추가금"}
              handleInput={handleAmountType}
              disabled={!editAmount}
            />
            <CustomRadioBtn
              label="할인금"
              id="할인금"
              checked={amountType === "할인금"}
              handleInput={handleAmountType}
              disabled={!editAmount}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[24px] flex-shrink-0 border-b border-sub-black h-fit">
        <TableHeader category={"사유"} header={true} cellStyle="h-[80px]" />
        <textarea
          className="flex disabled:bg-transparent w-full pr-[24px] resize-none py-[8px] px-[12px] leading-loose"
          id="memo"
          disabled={!editAmount}
          value={amount.memo}
          placeholder={!editAmount ? "" : "글자수 100자 제한"}
          onChange={(e) =>
            handleInput(e.target.id, strLengthLimit(e.target.value, 100))
          }
        />
      </div>
    </div>
  );
};
export default SpecialAmount;
