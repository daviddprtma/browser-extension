// src/popup/components/dashboard/PendingSent.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchPendingSentRequests } from '../../../../services/api';

interface Request {
  requestId: string;
  receiver: { id: string; username: string; displayName?: string };
  createdAt: string;
}

const PendingSent: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchPendingSentRequests(user.token)
      .then(res => setRequests(res.data || []))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      {loading && <div className="text-center text-gray-400 py-4">Loading...</div>}
      {!loading && requests.length === 0 && (
        <div className="text-center text-gray-400 py-4">No sent requests.</div>
      )}
      {requests.map(req => (
        <div key={req.requestId} className="flex items-center justify-between border-b py-2">
          <div>
            <div className="font-medium">{req.receiver.displayName || req.receiver.username}</div>
            <div className="text-xs text-gray-500">@{req.receiver.username}</div>
          </div>
          <div>
            {/* Cancel button can be added here */}
            <button className="px-2 py-1 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingSent;