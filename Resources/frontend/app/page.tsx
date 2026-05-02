import { redirect } from "next/navigation";

export default function Home() {
  // routing ke login page secara default
  redirect("/login");
}