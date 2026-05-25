import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Vote {
  id: string;
  voterName: string;
  voterEmail: string;
  voterPhone: string;
  voterCountry: string;
  collegeName: string;
  courseName: string;
  semester: string;
  yearOfStudy: string;
  candidate: string;
  supportReason: string;
  timestamp: string;
}

const VotingCRM = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [filteredVotes, setFilteredVotes] = useState<Vote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/votes');
      if (response.ok) {
        const data = await response.json();
        setVotes(data || []);
        setFilteredVotes(data || []);
      }
    } catch (error) {
      console.error('Error loading votes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = votes;

    if (searchTerm) {
      filtered = filtered.filter(vote =>
        vote.voterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vote.voterEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vote.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (countryFilter) {
      filtered = filtered.filter(vote => vote.voterCountry === countryFilter);
    }

    setFilteredVotes(filtered);
  }, [searchTerm, countryFilter, votes]);

  const handleDelete = async (voteId: string) => {
    if (confirm('Are you sure you want to delete this vote?')) {
      try {
        const response = await fetch('/api/votes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: voteId })
        });

        if (response.ok) {
          setVotes(votes.filter(v => v.id !== voteId));
          alert('Vote deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting vote:', error);
        alert('Error deleting vote');
      }
    }
  };

  const countries = [...new Set(votes.map(v => v.voterCountry))];

  const totalVotes = votes.length;
  const countryCounts = votes.reduce((acc, vote) => {
    acc[vote.voterCountry] = (acc[vote.voterCountry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCountry = Object.entries(countryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Voting CRM Dashboard</h1>
          <Button onClick={loadVotes} variant="outline">Refresh</Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Votes</h3>
            <p className="text-3xl font-bold text-blue-600">{totalVotes}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Countries</h3>
            <p className="text-3xl font-bold text-green-600">{countries.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Top Country</h3>
            <p className="text-2xl font-bold text-purple-600">{topCountry}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Today's Votes</h3>
            <p className="text-3xl font-bold text-orange-600">
              {votes.filter(v => new Date(v.timestamp).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Country</label>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Votes Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">College</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      Loading votes...
                    </td>
                  </tr>
                ) : filteredVotes.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No votes found
                    </td>
                  </tr>
                ) : (
                  filteredVotes.map((vote) => (
                    <tr key={vote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{vote.voterName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vote.voterEmail}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vote.voterPhone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vote.voterCountry}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vote.collegeName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vote.courseName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(vote.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          onClick={() => handleDelete(vote.id)}
                          variant="destructive"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingCRM;
