import React from "react";
import { useFetcher } from "@remix-run/react";

type JSONResponse<T> = {
  success: boolean;
  data: T;
  error?: {
    message: string;
  };
};

type Options = {
  /**
   * @description
   * Called after a fetcher returns data back & if `success` property in the data is `true`
   */
  onSuccess?: (loaderData: any) => void;
  /**
   * @description
   * Called after a fetcher returns data back & if `success` property in the data is `false`
   */
  onError?: (loaderData: any) => void;
  /**
   * @description
   * Unique identifier of `submit` being made. This is intended to help
   * identify which API requests are made on pages where multiple API requests happen.
   */
  queryKey?: string;
};

type UseRemixSubmitStatus = "loading" | "idle";

export const useRemixFetcher = ({ onError, onSuccess }: Options = {}) => {
  const fetcher = useFetcher();
  const [transitionLog, setTransitionLog] = React.useState<
    UseRemixSubmitStatus[]
  >(["idle"]);

  React.useEffect(() => {
    const hasFetcherFinishedSubmission =
      fetcher.state === "idle" &&
      fetcher.data != null &&
      fetcher.state === "idle";
    const shouldAppendTransitionLog =
      transitionLog.length < 3 && fetcher.state === "loading";
    const shouldResetTransitionLog =
      transitionLog.length === 2 && fetcher.state === "idle";

    if (shouldAppendTransitionLog) {
      setTransitionLog([...transitionLog, "loading"]);
    } else if (shouldResetTransitionLog) {
      setTransitionLog(["idle"]);
    }

    if (
      onSuccess &&
      (fetcher?.data as JSONResponse<any>)?.success === true &&
      hasFetcherFinishedSubmission
    ) {
      onSuccess(fetcher.data);
    } else if (
      onError &&
      (fetcher?.data as JSONResponse<any>)?.success === false &&
      hasFetcherFinishedSubmission
    ) {
      onError(fetcher.data);
    }
  }, [fetcher.state]);

  return fetcher;
};
