import { $, useStore } from "@builder.io/qwik";

interface IRequestState {
  isLoading: boolean;
  errorMessage: string | null;
}

export default function (fetch: () => Promise<void>) {
  const requestState = useStore<IRequestState>({
    isLoading: false,
    errorMessage: null,
  });

  const requestHandler = $(async () => {
    try {
      requestState.isLoading = true;
      requestState.errorMessage = null;
      await fetch();
    } catch (error) {
      requestState.errorMessage =
        error instanceof Error ? error.message : "Unknown error";
    } finally {
      requestState.isLoading = false;
    }
  });

  return {
    get isLoading() {
      return requestState.isLoading;
    },
    get errorMessage() {
      return requestState.errorMessage;
    },
    requestHandler,
  };
}
