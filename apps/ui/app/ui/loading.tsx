import { useMemo } from 'react';

const LoadingComponent = () => {
  return (
    <div className="content-center h-[100%]">
      <div className="object-center text-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    </div>
  );
};

export const Loading = () => {
  return useMemo(() => <LoadingComponent />, []);
};
