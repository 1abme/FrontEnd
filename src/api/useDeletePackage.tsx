import { useEffect, useState } from "react";
import { instance } from "./instance";

type UsePostPackageProps = {
  operation: string;
  ids: number[];
  deleteActive: boolean;
  setDeleteActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useDeletePackage = ({
  operation,
  ids,
  deleteActive,
  setDeleteActive,
}: UsePostPackageProps) => {
  const [packageDelete, setPackageDelete] = useState<number | null>(null);
  if (deleteActive && ids.length !== 0) {
    const fetchData = async () => {
      try {
        const response = await instance.post(
          `http://13.124.147.192:8080/packages/batch-delete`,
          {
            operation: operation,
            ids: ids,
          }
        );
        console.log(response);
        setPackageDelete(response.data.code);
        setDeleteActive(false);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    fetchData();
  }

  return { packageDelete };
};
