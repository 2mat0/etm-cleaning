export async function onRequestGet(context) {
  const apiKey = context.env.GOOGLE_PLACES_API_KEY;
  const placeId = context.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return new Response(
      JSON.stringify({ error: 'Missing server configuration' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'userRatingCount'
      }
    });

    if (!response.ok) {
      const details = await response.text();
      return new Response(
        JSON.stringify({ error: 'Google API request failed', details }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const payload = await response.json();
    const count = Number(payload && payload.userRatingCount);

    if (!Number.isFinite(count) || count < 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid review count response' }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch review count' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
