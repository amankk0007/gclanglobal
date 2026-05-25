import fs from 'fs';
import path from 'path';

const votesFilePath = path.join(process.cwd(), 'public', 'african', 'api', 'votes.json');

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
        // Get all votes
        if (fs.existsSync(votesFilePath)) {
          const votes = JSON.parse(fs.readFileSync(votesFilePath, 'utf8'));
          return res.status(200).json(votes);
        } else {
          return res.status(200).json([]);
        }

      case 'POST':
        // Add new vote
        const { body } = req;
        
        if (!body) {
          return res.status(400).json({ error: 'Invalid input' });
        }

        // Validate required fields
        const required = ['voterName', 'voterEmail', 'voterPhone', 'voterCountry', 'collegeName', 'courseName', 'semester', 'yearOfStudy', 'candidate', 'agreeTerms'];
        for (const field of required) {
          if (!body[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
          }
        }

        // Load existing votes
        let votes = [];
        if (fs.existsSync(votesFilePath)) {
          votes = JSON.parse(fs.readFileSync(votesFilePath, 'utf8'));
        }

        // Add new vote with ID and timestamp
        const newVote = {
          ...body,
          id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
          timestamp: new Date().toISOString()
        };
        votes.push(newVote);

        // Save to file
        fs.writeFileSync(votesFilePath, JSON.stringify(votes, null, 2));

        return res.status(200).json({ success: true, vote: newVote });

      case 'DELETE':
        // Delete a vote
        const { body: deleteBody } = req;
        const voteId = deleteBody?.id;

        if (!voteId) {
          return res.status(400).json({ error: 'Missing vote ID' });
        }

        // Load existing votes
        if (!fs.existsSync(votesFilePath)) {
          return res.status(404).json({ error: 'No votes found' });
        }

        votes = JSON.parse(fs.readFileSync(votesFilePath, 'utf8'));

        // Find and remove the vote
        const found = votes.some(vote => vote.id === voteId);
        
        if (!found) {
          return res.status(404).json({ error: 'Vote not found' });
        }

        votes = votes.filter(vote => vote.id !== voteId);

        // Save to file
        fs.writeFileSync(votesFilePath, JSON.stringify(votes, null, 2));

        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
