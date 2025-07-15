import dynamic from "next/dynamic";

export const components = {
  case_filters: dynamic(() => import("./CaseFilters")),
  case_grid: dynamic(() => import("./CaseGrid")),
  case_slyder: dynamic(() => import("./CategorySlyder")),
  hero_slice: dynamic(() => import("./HeroSlice")),
  news_grid_slice: dynamic(() => import("./NewsGridSlice")),
  stats_grid: dynamic(() => import("./StatsGrid")),
  team_slice: dynamic(() => import("./TeamSlice")),
};
