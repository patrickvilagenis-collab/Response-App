import type { Department } from "../types";

// Business areas used to browse the library and tailor the training plan.
export const DEPARTMENTS: { key: Department; icon: string; labelKey: string }[] = [
  { key: "leadership", icon: "🧭", labelKey: "dept.leadership" },
  { key: "finance", icon: "💰", labelKey: "dept.finance" },
  { key: "technology", icon: "💻", labelKey: "dept.technology" },
  { key: "commercial", icon: "📈", labelKey: "dept.commercial" },
  { key: "people", icon: "🤝", labelKey: "dept.people" },
  { key: "operations", icon: "⚙️", labelKey: "dept.operations" },
  { key: "customer", icon: "🎧", labelKey: "dept.customer" },
  { key: "legal", icon: "⚖️", labelKey: "dept.legal" },
];

// Existing general scenarios (no explicit department) read as Leadership.
export function challengeDept(c: { department?: Department }): Department {
  return c.department ?? "leadership";
}
