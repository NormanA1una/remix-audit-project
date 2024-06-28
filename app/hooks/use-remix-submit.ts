import React from "react";
import {
  useActionData,
  useLoaderData,
  useSubmit,
  useNavigation as useTransition,
} from "@remix-run/react";

type JSONResponse<T> = {
  success: boolean;
  data: T;
  error?: {
    message: string;
  };
};

type TransitionLogValue = "loading" | "idle";
type UseRemixSubmitOptions = {
  /**
   * @description
   * Called after a remix `loader`  or `action` has succesfully complete & if `success` property in the data is `true`
   */
  onSuccess?: (loaderData: any) => void;
  /**
   * @description
   * Called after a remix `loader` or `action` has succesfully completed  & if `success` property in the data is `false`
   */
  onError?: (loaderData: any) => void;
  /**
   * @description
   * Unique identifier of `submit` being made. This is intended to help
   * identify which API requests are made on pages where multiple API requests happen.
   */
  queryKey?: string;
};

export const useRemixSubmit = ({
  onError,
  onSuccess,
}: UseRemixSubmitOptions = {}) => {
  const submit = useSubmit();
  const [transitionLog, setTransitionLog] = React.useState<
    TransitionLogValue[]
  >(["idle"]); // start at 'idle'
  const transition = useTransition();
  const loaderData = useLoaderData() as JSONResponse<any>;
  const actionData = useActionData() as JSONResponse<any>;
  const [transitionType, setTransitionType] = React.useState<
    "actionSubmission" | "loaderSubmission"
  >();

  React.useEffect(() => {
    const hasFinishedSubmission =
      transitionLog.length === 2 && transition.state === "idle";
    const shouldAppendTransitionLog =
      transitionLog.length < 3 && transition.state === "loading";
    const shouldResetTransitionLog =
      transitionLog.length === 2 && transition.state === "idle";

    if (shouldAppendTransitionLog) {
      setTransitionLog([...transitionLog, "loading"]);
    }
    if (shouldResetTransitionLog) {
      setTransitionLog(["idle"]);
    }

    if (
      onSuccess &&
      (loaderData?.success || actionData?.success) &&
      hasFinishedSubmission
    ) {
      const data =
        transitionType === "loaderSubmission" ? loaderData : actionData;
      onSuccess(data);
    }
    if (
      onError &&
      (!loaderData?.success || !actionData?.success) &&
      hasFinishedSubmission
    ) {
      const data =
        transitionType === "loaderSubmission" ? loaderData : actionData;
      onError(data);
    }
  }, [transition.state]);

  React.useEffect(() => {
    if (transition.state === "submitting") {
      setTransitionType("actionSubmission");
    } else if (
      transition.state === "loading" &&
      transition.formMethod != null &&
      transition.formMethod != "GET" &&
      transition.formAction !== transition.location.pathname
    ) {
      setTransitionType("loaderSubmission");
    }
  }, [transition.state]);

  return { submit, transition };
};
