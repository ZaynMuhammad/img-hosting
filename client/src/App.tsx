import { useState } from 'react'
import { 
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';


import './App.css'
import { Home } from './components';

// Create a client
const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    	<QueryClientProvider client={queryClient}>
        	<Routes>
          	<Route path="/" element={<Home />} />
        	</Routes>
      	</QueryClientProvider>
    </>
  )
}


export default App
