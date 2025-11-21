import React, { createContext, useContext } from 'react';

type SEO = {
  title?: string;
  description?: string;
  keywords?: string;
};

type Hero = {
  slogan?: string;
  description?: string;
};

export type AppConfig = {
  basic?: {
    app_name?: string;
    strapi_url?: string;
    strapi_site_slug?: string;
    gtmId?: string;
    seo?: SEO;
    hero?: Hero;
  };
  extra?: Record<string, unknown>;
};

declare global {
  interface Window {
    APP_CONFIG?: AppConfig;
  }
}

const ConfigContext = createContext<AppConfig | null>(null);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = (typeof window !== 'undefined' && window.APP_CONFIG) || {};
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};