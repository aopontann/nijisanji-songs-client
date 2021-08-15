export const GA_TRAKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const pageview = (url) => {
  if (!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}