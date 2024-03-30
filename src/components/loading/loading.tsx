import {memo} from 'react';

function Loading (): JSX.Element {
  return (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

const MemorizedLoading = memo(Loading);

export default MemorizedLoading;
