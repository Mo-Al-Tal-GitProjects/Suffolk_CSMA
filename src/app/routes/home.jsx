import { Welcome } from "../welcome/welcome";

export function meta({ }) {
  return [
    { title: "Suffolk University Interactive Campus Map" }
  ];
}

export default function Home() {
  return <Welcome />;
}
