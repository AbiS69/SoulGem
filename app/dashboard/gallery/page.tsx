"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const dynamic = "force-dynamic";

function Gallery() {
//   const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchImages();
    }
  }, [userId]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/userImages/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          images.map((image, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img src={image.url} alt={`Image ${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
              <p>Prompt: {image.prompt}</p>
              <p>Created at: {new Date(image.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Gallery;