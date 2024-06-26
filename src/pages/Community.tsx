import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/common/Pagination";
import "../App.css";
import { baseInstance } from "../api/instance";
import CommunityEditor from "../components/Community/CommunityEditor";
import CommunityDetail from "../components/Community/CommunityDetail";
import SectionTitle from "../components/Main/SectionTitle";

type CommunityCloum = {
  title: string | JSX.Element;
  createdDate: string;
  check: JSX.Element;
};
type CommunityRow = {
  postId: number;
  title: JSX.Element;
  createdDate: string;
  id: number;
  check: JSX.Element;
};

const Community = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("공지사항");
  const [editorActive, setEditorActive] = useState<boolean>(true);
  const [selectCommunity, setSelectCommunity] = useState<number[]>([]);
  const [newData, setNewData] = useState<CommunityRow[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [deleteActive, setDeleteActive] = useState<boolean>(false);

  // 받아온 데이터 형태 바꾸기
  const [tableData, setTableData] = useState<CommunityRow[]>([]);
  // 열추가
  const columnHelper = createColumnHelper<CommunityCloum>();
  const columns = [
    columnHelper.accessor("check", {
      header: () =>
        isLogin ? (
          <input
            type="checkbox"
            onChange={handleToggleAll}
            checked={selectCommunity.length === newData.length}
          />
        ) : (
          <></>
        ),
      cell: ({ row }) => row.original.check,
    }),
    columnHelper.accessor("title", {
      header: "제목",
      cell: ({ row }) => row.original.title,
    }),
    columnHelper.accessor("createdDate", { header: "작성일자" }),
  ];
  useEffect(() => {
    baseInstance
      .get(`/posts/${active}/${0}`)
      .then((res) => {
        setTableData(res.data.data);
        setDeleteActive(false);
      })
      .catch((err) => console.log(err));
  }, [active, deleteActive]);

  useEffect(() => {
    if (tableData.length !== 0) {
      setNewData(
        tableData.map((item: CommunityRow) => ({
          ...item,
          id: item.postId,
          check: isLogin ? (
            <input
              type="checkbox"
              onChange={() => handleToggleItem(item.postId)}
              checked={selectCommunity.includes(item.postId)}
            />
          ) : (
            <></>
          ),
          title: (
            <button type="button">
              <Link to={`/community/${item.postId}`} state={item.postId}>
                {item.title}
              </Link>
            </button>
          ),
        }))
      );
    } else {
      setNewData([]);
    }
  }, [tableData, selectCommunity]);

  console.log(newData, selectCommunity);
  const handleToggleAll = () => {
    if (selectCommunity.length === newData.length) {
      setSelectCommunity([]);
    } else {
      setSelectCommunity(newData.map((item) => item.postId));
    }
  };

  const handleToggleItem = (key: number): void => {
    setSelectCommunity((prevSelectCommunity) => {
      if (prevSelectCommunity.includes(key)) {
        return prevSelectCommunity.filter((id) => id !== key);
      } else {
        return [...prevSelectCommunity, key];
      }
    });
  };

  // 사이드 네비게이션
  const handleNavClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    el: string
  ) => {
    const { name } = e.currentTarget;
    if (name === el) {
      setSelectCommunity([]);
      setActive(name);
      navigate("/community");
      setEditorActive(true);
    }
  };
  // 등록/삭제 클릭
  // const handleRegisterDeleteClick = (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   const { name } = e.currentTarget;
  //   if (name === "등록하기") {
  //     setEditorActive(false);
  //   } else if (name === "삭제하기") {
  //     if (selectCommunity.length === 0) {
  //       alert("하나 이상 삭제할 게시물을 체크해주세요");
  //     } else if (confirm("삭제하시겠습니까?")) {
  //       instance.delete(`/posts/${selectCommunity}`).then((res) => {
  //         if (res.status === 200) {
  //           alert("삭제가 완료됐습니다.");
  //           setDeleteActive(true);
  //         } else {
  //           alert("오류가 발생했습니다.");
  //         }
  //       });
  //     }
  //     return;
  //   }
  // };

  const handleRegisterDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const { name } = e.currentTarget;

    if (name === "등록하기") {
      setEditorActive(false);
    } else if (
      name === "삭제하기" &&
      selectCommunity.length > 0 &&
      confirm("삭제하시겠습니까?")
    ) {
      try {
        const res = await baseInstance.post(`/posts/batch-delete`, {
          operation: "",
          ids: selectCommunity,
        });

        if (res.status === 200) {
          alert("삭제가 완료됐습니다.");
          setDeleteActive(true);
        } else {
          alert("오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        alert("오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    setActive(location.state || "공지사항");
  }, [location.state]);

  return (
    <div className="w-[1280px] flex flex-col justify-center items-center">
      <div className="h-[400px] w-full bg-main-color mb-8" />
      <div className="flex w-full  ">
        <div className="flex flex-col items-start mr-9">
          <SectionTitle title="커뮤니티" padding={true} />
          {["공지사항", "자주묻는질문", "여행이야기"].map((el, idx) => (
            <button
              key={idx}
              name={el}
              onClick={(e) => handleNavClick(e, el)}
              className={`border border-main-color w-44 h-9 font-bold hover:bg-main-color hover:text-white ${
                active === el && "bg-main-color text-white"
              } ${idx === 0 || idx === 1 ? "mb-2" : ""}`}
            >
              {el}
            </button>
          ))}
        </div>
        {!params.postId ? (
          editorActive ? (
            <div>
              <Table
                columns={columns}
                data={newData}
                tableStyle={
                  "text-center w-[750px] border-main-color border-t-[0.5px] border-b-[0.5px]"
                }
                theadStyle={
                  "bg-main-color bg-opacity-10 h-[24px] mt-[1px] border-t-[0.5px] border-b-[0.5px] border-main-color"
                }
                thStyle={"text-[12px]"}
                tbodyStyle={"text-[10px]"}
                tbodyTrStyle={
                  "border-t-[0.5px] border-dashed border-main-color"
                }
                tdStyle={"py-[14px]"}
              />
              {isLogin ? (
                <div className="flex justify-end w-full">
                  {["삭제하기", "등록하기"].map((el, idx) => (
                    <button
                      className={`border border-main-color  rounded-full px-3 mt-4 hover:bg-main-color hover:text-white ${
                        idx === 0 ? "mr-2" : ""
                      }`}
                      key={idx}
                      name={el}
                      onClick={handleRegisterDeleteClick}
                    >
                      {el}
                    </button>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <div className="flex items-center w-full justify-center">
                <Pagination />
              </div>
            </div>
          ) : (
            <CommunityEditor />
          )
        ) : (
          <CommunityDetail setEditorActive={setEditorActive} />
        )}
      </div>
    </div>
  );
};

export default Community;
