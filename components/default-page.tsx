import {
  DbBrand,
  DbFooter,
  DbHeader,
  DbMainnavigation,
  DbPage,
  GithubVersionSwitcher,
} from "@db-ui/react-elements";
import StaticContent from "./static-content";
import { ROUTES } from "../data/routes";
import "@db-ui/core/dist/css/db-ui-core.vars.css";
import { useRouter } from "next/router";
import { DbMainnavigationDataType } from "@db-ui/elements/dist/types/components/db-mainnavigation/db-mainnavigation-type";

const getRoutesWithCurrent = (
  routes: DbMainnavigationDataType[],
  pathname: string
): DbMainnavigationDataType[] => {
  if (!routes) {
    return [];
  }

  return routes.map((route) => ({
    ...route,
    link:
      process.env.NODE_ENV === "development" || route.link === "/"
        ? route.link
        : `${route.link}.html`,
    current:
      (route.link === "/" && pathname === "/") ||
      (route.link !== "/" && pathname.includes(route.link)),
    children: route.children
      ? getRoutesWithCurrent(route.children, pathname)
      : [],
  }));
};

const DefaultPage = ({ children }: any) => {
  const router = useRouter();
  return (
    <StaticContent>
      <DbPage>
        <DbHeader slot="header">
          <DbBrand src="/images/db_logo.svg" anchorRef="">
            DB UI Base
          </DbBrand>
          <DbMainnavigation
            data={JSON.stringify(getRoutesWithCurrent(ROUTES, router.pathname))}
          />
          {process.env.NEXT_PUBLIC_GITHUB_VERSION_SWITCHER === "true" && (
            <GithubVersionSwitcher
              owner={process.env.NEXT_PUBLIC_GITHUB_OWNER}
              repo={process.env.NEXT_PUBLIC_GITHUB_REPO}
            />
          )}
        </DbHeader>
        <main>
          <div>{children}</div>
        </main>

        <DbFooter slot="footer" copyright />
      </DbPage>
    </StaticContent>
  );
};

export default DefaultPage;
