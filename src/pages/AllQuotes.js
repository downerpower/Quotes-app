import { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound'

const AllQuotes = () => {
   const { sendRequest, status, data: loadedQuote, error } = useHttp(getAllQuotes, true);

   useEffect(() => {
      sendRequest()
   }, [sendRequest])

   if (status === 'loading') {
      return (
      <div className='centered'>
         <LoadingSpinner />
      </div>
      )
   }

   if (error) {
      return <p className='centered focused'>{error}</p>
   }

   if (status === 'completed' && (!loadedQuote || loadedQuote.length === 0)) {
      return <NoQuotesFound />
   }

   return (
      <>
      {loadedQuote && <QuoteList quotes={loadedQuote} />}
      </>
   );
}

export default AllQuotes;