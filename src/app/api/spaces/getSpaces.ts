import { getBaseUrl } from '@/src/libs/getBaseUrl';
import { notFound } from 'next/navigation';

export async function getSpaces() {
  const res = await fetch(
    `${getBaseUrl()}/api/spaces`,
    {
      cache: 'no-cache',
    }
  );

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const configs = (await res.json());

  const spaces = Object.values(configs).map((space: any) => {
    return space;
  });

  if (spaces.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  console.log("spaces", spaces);

  return spaces;
}

export async function getSpace({ slug }: { slug?: string } = {}) {
    const res = await fetch(
      `${getBaseUrl()}/api/spaces/${slug}`,
      {
        cache: 'no-cache',
      }
    );
  
    if (!res.ok) {
      // Render the closest `error.js` Error Boundary
      throw new Error('Something went wrong!');
    }
  
    return await res.json();
  }