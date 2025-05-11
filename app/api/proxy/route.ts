export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
  
    if (!fileUrl) {
      return new Response(JSON.stringify({ error: 'Missing URL' }), { status: 400 });
    }
  
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      return new Response(blob);
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to fetch file' }), { status: 500 });
    }
  }
  