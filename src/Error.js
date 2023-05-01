import { useRouteError } from "react-router";

export function ErrorPage(){
    const error=useRouteError();
    console.error(error);
    return(
        <div id="error-page">
        <h1>Ooops!</h1>
        <h2>Sorry an unexpected error has occured.</h2>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
        </div>
    );
}