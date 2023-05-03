import { getBaseUrl } from '@/src/libs/getBaseUrl';
import { notFound } from 'next/navigation';

export async function getSpaces() {
  const res = await fetch(
    `${getBaseUrl()}/api/spaces`,
  );

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const spaces = (await res.json());

  if (spaces.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return spaces;
}

export async function getSpace({ slug }: { slug?: string } = {}) {
    const res = await fetch(
      `${getBaseUrl()}/api/spaces/${slug}`,
    );
  
    if (!res.ok) {
      // Render the closest `error.js` Error Boundary
      throw new Error('Something went wrong!');
    }
  
    const space = (await res.json());
  
    if (space.length === 0) {
      // Render the closest `not-found.js` Error Boundary
      notFound();
    }
  
    return space;
  }