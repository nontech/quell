import { goals } from "./data";

export function load() {
  return {
    goals_list: goals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      startDate: goal.startDate,
      endDate: goal.endDate,
      hoursInvestedPerWeek: goal.hoursInvestedPerWeek,
    })),
  };
}
