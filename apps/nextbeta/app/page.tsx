import Image from "next/image";
import { Inter } from "next/font/google";
import { sum } from "lib";
import { Button, Buttontw } from "ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const testsum = sum(1, 2);
  console.log(testsum);

  return (
    <div>
      <div className="text-3xl font-bold underline">hello next betass</div>
      <Button> button </Button>
      <hr />
      <Buttontw label={'button tw'} />
    </div>
  );
}
