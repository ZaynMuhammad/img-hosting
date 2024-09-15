import { useState } from 'react'
import { 
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import './App.css'
import { Test } from './components';


// Create a client
const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Test />
      </QueryClientProvider>
    </>
  )
}


export default App
