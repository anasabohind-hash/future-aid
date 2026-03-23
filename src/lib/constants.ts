export const SHEET_TABS = [
  { id: "events", label: "📅 Events", sheet: "📅 Events" },
  { id: "formations", label: "🎓 Formations", sheet: "🎓 Formations" },
  { id: "certifs", label: "📜 Certifs", sheet: "📜 Certifs" },
  { id: "study-abroad", label: "✈️ Study Abroad", sheet: "✈️ Study Abroad" },
  { id: "competition-online", label: "💻 Competition Online", sheet: "💻 Competition Online" },
  { id: "competition-offline", label: "🏆 Competition Offline", sheet: "🏆 Competition Offline" },
] as const;

export const CATEGORIES: Record<string, string[]> = {
  "certifs": ["Cybersecurity", "AI", "Development"],
  "competition-online": ["Robotics", "Entrepreneurship", "Cybersecurity", "AI", "Development"],
  "competition-offline": ["Robotics", "Entrepreneurship", "Cybersecurity", "AI", "Development"],
  "study-abroad": ["Canada", "France"],
};

export const SPREADSHEET_ID = "1I3O0QiVVHQj_kkwqGEuFwZ0UYTfpJIaYQKcKSD_6UrY";
export const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

// Replace this with your deployed Google Apps Script web app URL
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-9yIobvN3R3vjMcdLrviYopald_7ad1ULk7FqzUw-MJ9YHi_0dvIug4yb-v1cGMSviA/exec";
