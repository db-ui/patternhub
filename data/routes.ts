import { DbMainnavigationDataType } from "@db-ui/elements/dist/types/components/db-mainnavigation/db-mainnavigation-type";

export const ROUTES: DbMainnavigationDataType[] = [
  {
    label: "Startseite",
    link: "/",
  },
  {
    label: "Foundations",
    link: "/foundations",
    children: [
      {
        label: "Farben",
        link: "/foundations/colors",
        children: [
          { label: "Beispiele", link: "/foundations/colors/examples" },
        ],
      },
      { label: "Icons", link: "/foundations/icons" },
    ],
  },
];
