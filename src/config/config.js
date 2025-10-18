export const config = {
  api_url: import.meta.env.VITE_API_BASE_URL,
  app_mode: import.meta.env.VITE_APP_MODE,
  is_dev: import.meta.env.VITE_APP_MODE === "DEV" ,
};
