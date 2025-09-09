import {useEffect} from "react";
import {useLocation} from "react-router-dom";

type MetaInfo = {
    title?: string; description?: string; keywords?: string; [key: string]: string | undefined;
};

export function usePageMeta(meta: MetaInfo) {
    const location = useLocation();

    useEffect(() => {
        if(meta.title) {
            document.title = meta.title;
        }

        Object.entries(meta)
              .forEach(([name, content]) => {
                  if(!content || name === "title") {
                      return;
                  }

                  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

                  if(!tag) {
                      tag = document.createElement("meta");
                      tag.setAttribute("name", name);
                      document.head.appendChild(tag);
                  }

                  tag.setAttribute("content", content);
              });
    }, [
                  location.pathname,
                  meta
              ]);
}
