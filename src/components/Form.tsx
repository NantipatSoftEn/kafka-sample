import React, { useEffect, useState } from 'react';
import { startKafka, stopKafka } from '../lib/kafka';


export const  Form = ()  => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    startKafka();
    return () => {
      stopKafka().then(() => {
        console.log('Kafka stopped successfully');
      }).catch((error) => {
        console.error('Error stopping Kafka:', error);
      });
    };
  }, []); // Empty dependency array ensures this runs only once
  
  const sendMessage = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4321/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      console.log('Result:', result);
      if (result.message) {
        alert('Message sent successfully!');
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container">
      <h1>Send Message to Kafka</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
          className='form-control form-control-lg'
        />
        <button className="btn btn-primary mt-4" type="submit" >Send</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

