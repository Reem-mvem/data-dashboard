export async function GET() {
    try {
      const res = await fetch(
        'https://open.data.gov.sa/data/api/datasets/resources?version=1&dataset=31af324f-d2b5-459a-9824-f27f8adef5fd'
      );
  
      const data = await res.json();
  
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch dataset resources' }),
        { status: 500 }
      );
    }
  }
  