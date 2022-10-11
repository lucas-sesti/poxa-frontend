import { useEffect } from "react";

const useScript = (url: string, view?: string) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    if (view) {
      // @ts-ignore
      script["view"] = view;
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
