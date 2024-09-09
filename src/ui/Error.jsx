import {  useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function NotFound() {

  const Error = useRouteError()
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{Error.data || Error.message}</p>
      <LinkButton to="-1">&larr; Go back </LinkButton>
      
    </div>
  );
}

export default NotFound;
