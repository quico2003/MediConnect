const {
  VITE_API_URL,
  VITE_VERSION,
  VITE_API_KEY,
  VITE_INSTANCE_KEY,
  VITE_NAME,
  VITE_MODE,
} = import.meta.env;

export const isDev = VITE_MODE === "development";

export const Configuration = {
  //API Config
  API_URL: VITE_API_URL,
  API_KEY: VITE_API_KEY,
  INSTANCE_KEY: VITE_INSTANCE_KEY,
  APP_NAME: VITE_NAME,
  APP_VERSION: VITE_VERSION,

  //Tables
  tables: {
    defaultPageSize: 10,
    pageSizeOptions: ["1", "5", "10", "25", "50", "100"],
  },

  //Theme
  theme: {
    general: {
      app: {
        backgroundColor: "bg-light",
      },
      sidebar: {
        maximisedWidth: 350, //Between 250 - 400
        minimisedWidth: 90,
        rounded: false,
        backgroundColor: "bg-white",
        groupSideBarItems: true,
        showIcons: true,
        showLogo: true,
        showTitle: true,
      },
      boards: {
        defaultViewMode: "card", //list - card
      },
      footer: {
        height: 65,
      },
      navbar: {
        height: 75,
      },
    },
  },

  //Search
  search: {
    organisations: {
      maxResults: 6,
    },
    users: {
      maxResults: 6,
    },
    players: {
      maxResults: 6,
    },
  },

  //Path
  BASE_PATH: "/",

  //Responsiveness settings
  BREAKPOINT: 992, //Less than that width, will be considered as mobile

  //Other
  dateFormat: "YYYY-MM-DD",
  timeFormat: "hh:mm:ss",
  dateTimeFormat: "YYYY-MM-DD hh:mm:ss",
};

window.showExperimentalFeatures = false;
window.showEasterEggs = false;
