// Simple in-memory storage (resets on deployment)
// For production, use Vercel KV or Vercel Postgres
let votes = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const method = req.method;

    switch (method) {
      case 'GET':
        return res.status(200).json(votes);

      case 'POST':
        const { body } = req;
        
        if (!body) {
          return res.status(400).json({ error: 'Invalid input' });
        }

        const newVote = {
          ...body,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        };
        votes.push(newVote);

        return res.status(200).json({ success: true, vote: newVote });

      case 'DELETE':
        const { body: deleteBody } = req;
        const voteId = deleteBody?.id;

        if (!voteId) {
          return res.status(400).json({ error: 'Missing vote ID' });
        }

        const initialLength = votes.length;
        votes = votes.filter(vote => vote.id !== voteId);

        if (votes.length === initialLength) {
          return res.status(404).json({ error: 'Vote not found' });
        }

        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
