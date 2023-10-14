'use client';
import React, { useEffect, useState } from 'react';

interface QuoteData {
  content: string;
}

function MotivationQuote() {
  const [quote, setQuote] = useState<QuoteData>({ content: '' });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.quotable.io/random?maxLength=30')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center border-2 border-mainGreen rounded-lg p-2 text-center shadow-md">
      {isLoading ? <p>Loading...</p> : <p>{`"${quote.content}"`}</p>}
    </div>
  );
}

export default MotivationQuote;
