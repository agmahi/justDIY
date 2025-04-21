import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

type IconMatch = { name: string; component: LucideIcon };

// Keywords mapped to possible Lucide icon names
const iconKeywordMap: Record<string, string[]> = {
  subscription: ["CreditCard", "Repeat"],
  payment: ["CreditCard", "DollarSign"],
  privacy: ["ShieldCheck", "Lock"],
  data: ["BarChart", "Eye"],
  family: ["Users", "UserPlus"],
  cancel: ["X", "Slash"],
  trial: ["Clock", "CalendarCheck"],
  device: ["Smartphone", "MonitorSmartphone"],
  ios: ["Apple", "Smartphone"],
  mac: ["Monitor", "Laptop"],
  time: ["Clock", "Hourglass"],
  terms: ["FileText", "ScrollText"],
};

export const getIconsFromPrompt = (prompt: string | undefined): IconMatch[] => {
  if (!prompt) return [{ name: "FileText", component: LucideIcons.FileText }];

  const found = new Set<string>();
  const lower = prompt.toLowerCase();

  for (const keyword in iconKeywordMap) {
    if (lower.includes(keyword)) {
      iconKeywordMap[keyword].forEach(icon => found.add(icon));
    }
  }

  const results: IconMatch[] = [];

  for (const name of found) {
    const component = LucideIcons[name as keyof typeof LucideIcons] as LucideIcon;
    if (component) {
      results.push({ name, component });
    }
  }

  // Fallback if nothing matched
  if (results.length === 0) {
    results.push({ name: "AlertTriangle", component: LucideIcons.AlertTriangle });
  }

  return results;
};