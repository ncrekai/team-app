import { useRouteError } from 'react-router-dom';

const Error = () => {
   const error = useRouteError();
   console.error(error);

   return (
      <div className='page-inner'>
         <h1>Oops. I broke.</h1>
         <p>
            <i>{error.statusText || error.message}</i>
         </p>
      </div>
   );
};
export default Error;
