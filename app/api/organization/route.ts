export async function GET() {
    try {
      const res = await fetch(
        'https://open.data.gov.sa/data/api/organizations?version=1&organization=ed1f266a-b956-40f3-b2a9-b0f513eed695'
      );
  
      const data = await res.json();
  
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch organization info' }),
        { status: 500 }
      );
    }
  }
  