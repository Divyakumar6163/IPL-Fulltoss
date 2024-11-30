import { Card } from "flowbite-react";

export default function DataCard({ heading, para }) {
  return (
    <Card className="max-w-sm my-7 mx-5">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {heading}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{para}</p>
    </Card>
  );
}
