import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

//new GraphQL server link 
const httpLink = createHttpLink({
 
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // retrieve token from localStorage
  const token = localStorage.getItem("id_token");
  return {
    // HTTP to request headers of every request to include token
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// creat apollo connection
const client = new ApolloClient({
  // concat authLink and httpLink obj so individual requests are receiving tokens
  link: authLink.concat(httpLink),
  // set up cache
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
        <Routes>
          <Route 
                path="/" 
                element= {<SearchBooks/>}/>
      
              <Route 
                path="/savedBooks" 
                element={<SavedBooks/>} />
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;