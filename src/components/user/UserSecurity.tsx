import React from 'react';
import { toast } from 'react-toastify';
import { useEnv } from '../../providers/EnvProvider';
import { useMountedState } from '../../commons/hooks/use-mounted-state';
import { axios } from '../../providers/axios';
import { Button } from '../../commons/components/Button';
import { useAuth } from '../../providers/AuthProvider';

function Disconnect() {
  const env = useEnv();
  const [loading, setLoading] = useMountedState(false);
  const { signOut } = useAuth();

  const disconnect = () => {
    setLoading(true);
    return axios
      .put(`${env.MELI_API_URL}/api/v1/user/disconnect`)
      .then(() => {
        signOut();
      })
      .catch(err => {
        toast(`Could not delete invite: ${err}`, {
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="card">
      <div className="card-header no-border d-flex justify-content-between">
        <strong>Disconnect from all devices</strong>
        <Button className="btn btn-danger" loading={loading} onClick={disconnect}>
          disconnect
        </Button>
      </div>
    </div>
  );
}

export function UserSecurity() {
  return (
    <>
      <Disconnect />
    </>
  );
}
