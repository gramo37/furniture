/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from "fs";
import path from "path";
import Image from 'next/image';

const getSiteData = () => {
  const dataPath = path.join(
    process.cwd(),
    "src",
    "app",
    "data",
    "siteData.json"
  );
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));
  return [data, dataPath];
};

export default async function Home() {
  const [data] = getSiteData();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-4xl font-bold text-center">Furniture Portfolio</h1>
      </header>
      <main className="mt-8">
        {data.portfolio.map((section: any, index: number) => (
          <section key={index} className="my-8">
            <h2 className="text-3xl font-bold text-gray-800">{section.category}</h2>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {section.images.map((img: string, i: number) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img}
                    alt={section.category}
                    className="w-full h-56 object-cover"
                    height={10}
                    width={10}
                  />
                  <div className="p-4 bg-white">
                    <p className="text-lg font-semibold text-gray-700">
                      {section.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
