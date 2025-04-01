export const config = {
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "",

  // Authentication
  nextAuthUrl: process.env.NEXTAUTH_URL || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",

  // Application
  appName: "Hayoma Dairy",
  appDescription: "Dairy management system for Hayoma Dairy Company",

  // Feature flags
  features: {
    analytics: true,
    userManagement: true,
    shopManagement: true,
    supplierManagement: true,
  },

  // Development mode
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
}

