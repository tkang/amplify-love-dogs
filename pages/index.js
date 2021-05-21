import Head from "next/head";
import { useEffect, useState } from "react";
import _ from "lodash";
import BREEDS from "../src/breeds";
import fs from "fs";
import {
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

async function fetchBreeds() {
  return [...Object.keys(BREEDS)];
}

async function fetchBreedImageUrls(mainBreed) {
  const data = fs.readFileSync("breed-image-url.json");
  const imageUrls = JSON.parse(data);
  return imageUrls;
}

export async function getStaticProps(context) {
  const breeds = await fetchBreeds();
  const breedImageUrls = await fetchBreedImageUrls();

  return {
    props: { initialBreeds: breeds, initialBreedsUrls: breedImageUrls },
  };
}

function DogCard({ breed, imageUrl, onNext, onPrev, onLike }) {
  console.log("breed = ", breed);
  console.log("imageUrl = ", imageUrl);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
    >
      <li></li>
      <li key={imageUrl} className="relative">
        <div className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
          <img
            src={imageUrl}
            alt=""
            className="object-cover pointer-events-none group-hover:opacity-75"
          />
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details</span>
          </button>
        </div>
        <div className="mt-2">
          <span className="relative z-0 inline-flex rounded-md shadow-sm">
            <button
              onClick={onPrev}
              type="button"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={onLike}
              type="button"
              className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <HeartIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={onNext}
              type="button"
              className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </span>
        </div>
      </li>
      <li></li>
    </ul>
  );
}

function Home({ initialBreeds, initialBreedsUrls }) {
  const [breeds, setBreeds] = useState(initialBreeds);
  const [breedsUrls, setBreedsUrls] = useState(initialBreedsUrls);
  const [randomBreed, setRandomBreed] = useState();
  const [randomBreedUrl, setRandomBreedUrl] = useState();

  useEffect(() => {
    console.log("breeds = ", breeds);
  }, []);

  useEffect(() => {
    setRandomBreed(_.sample(breeds));
  }, [breeds]);

  useEffect(() => {
    const urls = breedsUrls[randomBreed];
    const url = _.sample(urls);
    setRandomBreedUrl(url);
  }, [randomBreed]);

  const handleLike = () => {
    console.log("liked ", randomBreed);
    setRandomBreed(_.sample(breeds));
  };

  return (
    <div>
      <Head>
        <title>Amplify Love Dogs</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐕</text></svg>"
        />
      </Head>

      <div className="container mx-auto">
        <main className="bg-white">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Amplify Love Dogs
              </p>
              <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">
                Welcome to Amplify Love Dogs
              </p>
              <div className="mt-4">
                {randomBreed && randomBreedUrl && (
                  <DogCard
                    breed={randomBreed}
                    imageUrl={randomBreedUrl}
                    onLike={() => handleLike()}
                    onPrev={() => setRandomBreed(_.sample(breeds))}
                    onNext={() => setRandomBreed(_.sample(breeds))}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </div>
  );
}

export default Home;
