import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  // In a real application, this data would come from a database
  return {
    goals: [
      {
        id: 1,
        title: "Get a 6-pack",
        dueDate: "15/06/2024",
        hoursPerWeek: 2,
        startingTime: "next week",
        progress: 25,
      },
      {
        id: 2,
        title: "Run a marathon",
        dueDate: "30/09/2024",
        hoursPerWeek: 3,
        startingTime: "tomorrow",
        progress: 10,
      },
    ],
  };
};
