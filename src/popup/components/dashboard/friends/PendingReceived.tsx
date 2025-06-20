// src/popup/components/dashboard/PendingReceived.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchPendingReceivedRequests, acceptFriendRequest, ignoreFriendRequest } from '../../../../services/api';

interface Request {
  requestId: string;
  sender: { id: string; username: string; displayName?: string };
  createdAt: string;
}

const PendingReceived: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Guard clause for null user
  if (!user) {
    return <div className="text-center text-gray-400 py-4">Please log in to view requests.</div>;
  }

  useEffect(() => {
    setLoading(true);
    fetchPendingReceivedRequests(user.token)
      .then(res => setRequests(res.data || []))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      {loading && <div className="text-center text-gray-400 py-4">Loading...</div>}
      {!loading && requests.length === 0 && (
        <div className="text-center text-gray-400 py-4">No received requests.</div>
      )}
      {requests.map(req => (
        <div key={req.requestId} className="flex items-center justify-between border-b py-2">
          <div>
            <div className="font-medium">{req.sender.displayName || req.sender.username}</div>
            <div className="text-xs text-gray-500">@{req.sender.username}</div>
          </div>
          <div>
            <button
              className="px-2 py-1 bg-green-500 text-white rounded mr-2"
              onClick={async () => {
                await acceptFriendRequest(req.requestId, user.token);
                setRequests(requests.filter(r => r.requestId !== req.requestId));
              }}
            >
              Accept
            </button>
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
              onClick={async () => {
                await ignoreFriendRequest(req.requestId, user.token);
                setRequests(requests.filter(r => r.requestId !== req.requestId));
              }}
            >
              Ignore
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingReceived;