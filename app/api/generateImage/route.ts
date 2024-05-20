// app/api/generateImage/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { prompt, size, definition } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        quality: definition,
      }),
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
