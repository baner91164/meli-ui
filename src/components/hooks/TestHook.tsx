import React from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { Button } from '../../commons/components/Button';
import { axios } from '../../providers/axios';
import { useEnv } from '../../providers/EnvProvider';
import { useMountedState } from '../../commons/hooks/use-mounted-state';

export function TestHook({
  config, className, disabled,
}: {
  config: any;
  className?: string;
  disabled: boolean;
}) {
  const [loading, setLoading] = useMountedState(false);
  const env = useEnv();
  const test = () => {
    setLoading(true);
    axios
      .post(`${env.MELI_API_URL}/api/v1/sites/notifications/test`, config)
      .then(() => toast('It worked !', {
        type: 'success',
      }))
      .catch(err => toast(`It didnt work: ${err}`, {
        type: 'error',
      }))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Button
        loading={loading}
        onClick={test}
        disabled={disabled}
        className={classNames('btn btn-sm btn-primary', className)}
      >
        Test
      </Button>
    </>
  );
}
