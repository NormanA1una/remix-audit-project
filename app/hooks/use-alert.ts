import { useState, useCallback } from "react";
import { useRemixFetcher } from "./use-remix-fetcher";
import { useRemixSubmit } from "./use-remix-submit";

type HookType = "submit" | "fetcher";

interface UseStatusAlertOptions {
  onError?: (props?: any) => void;
  onSuccess?: () => void;
  hook?: HookType;
}

export const useAlert = (options: UseStatusAlertOptions = {}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const showAlert = (success: boolean) => {
    setStatus(success ? "success" : "error");
    setOpen(true);
  };

  const { onError, onSuccess, hook = "fetcher" } = options;

  const handleSuccess = () => {
    showAlert(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleError = (error: any) => {
    if (error && !error.success) {
      showAlert(false);
      if (onError) {
        onError(error);
      }
    }
  };

  const { submit: submitWithFetcher } = useRemixFetcher({
    onSuccess: handleSuccess,
    onError: (error) => handleError(error),
  });

  const { submit: submitWithSubmit } = useRemixSubmit({
    onSuccess: handleSuccess,
    onError: (error) => handleError(error),
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const finalSubmitHook =
    hook === "submit" ? submitWithSubmit : submitWithFetcher;

  return {
    open,
    status,
    handleClose,
    submit: finalSubmitHook,
  };
};
