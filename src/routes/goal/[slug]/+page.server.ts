import { error } from "@sveltejs/kit";
import { goals } from "../data";

export function load({ params }) {
  const goal = goals.find((goal) => goal.title === params.slug);
  if (!goal) {
    throw error(404, "Goal not found");
  }
  return { goal };
}
