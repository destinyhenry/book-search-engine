import React from 'react';
import {ApolloClient,ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import Navbar from './components/Navbar';



const client = new ApolloClient ({
  request: (operation) => {
    // get the authentication token from local storage if it exists
   const token = localStorage.getItem("id_token");


   operation.setContext ({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
},
  uri: "/graphql"
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <Switch>
          <Route 
                path="/" 
                element= {SearchBooks}/>
      
              <Route 
                path="/savedBooks" 
                element={SavedBooks} />

              <Route 
                path="/signup" 
                element={Signup}/>
           
              <Route 
                path="/me" 
                element={Login}/>
            
          </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;