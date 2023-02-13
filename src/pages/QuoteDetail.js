import { Fragment, useEffect } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
   const location = useLocation();

   const { quoteId } = useParams();

   const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

   useEffect(() => {
      sendRequest(quoteId)
   }, [sendRequest, quoteId])

   if (status === 'pending') {
      return (
         <div className='centered'>
            <LoadingSpinner />
         </div>
      )
   }

   if (error) {
      return <p className='centered focused'>{error}</p>
   }


   if (!loadedQuote.text) {
      return <p>No quote found!</p>
   }

   return (
      <Fragment>
         <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        {location.pathname !== '/quotes/-NO92uq62TqdBz1JmrIA/comments' && <div className="centered">
            <Link className="btn--flat" to={`comments`}>Load comments</Link>
         </div>}
         <Routes>
            <Route path={`comments`} element={<Comments />} />
         </Routes>
      </Fragment >
   );
}

export default QuoteDetail;