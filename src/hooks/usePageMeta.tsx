import {useEffect} from "react";
import {useLocation} from "react-router-dom";

type MetaInfo = {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    jsonLd?: string;
    [key: string]: string | undefined;
};

function upsertMetaByName(name: string, content: string) {
    let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

    if(!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
    let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

    if(!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function upsertCanonicalLink(href: string) {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if(!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
    }

    link.setAttribute("href", href);
}

function upsertJsonLd(jsonLd: string) {
    const scriptId = "json-ld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if(!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
    }

    script.textContent = jsonLd;
}

export function usePageMeta(meta: MetaInfo) {
    const location = useLocation();

    useEffect(() => {
        if(meta.title) {
            document.title = meta.title;
        }

        if(meta.canonical) {
            upsertCanonicalLink(meta.canonical);
        }

        if(meta.jsonLd) {
            upsertJsonLd(meta.jsonLd);
        }

        Object.entries(meta)
              .forEach(([name, content]) => {
                  if(!content || name === "title" || name === "canonical" || name === "jsonLd") {
                      return;
                  }

                  if(name.startsWith("og:")) {
                      upsertMetaByProperty(name, content);
                      return;
                  }

                  if(name.startsWith("twitter:")) {
                      upsertMetaByName(name, content);
                      return;
                  }

                  upsertMetaByName(name, content);
              });
    }, [
                  location.pathname,
                  meta
              ]);
}
