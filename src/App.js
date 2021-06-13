import React,  { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/header/Header';
import HomeScreen from './components/screens/homeScreen/HomeScreen';
import { Container } from 'react-bootstrap'
import Sidebar from './components/sidebar/Sidebar';
import LoginScreen from './components/screens/loginScreen/LoginScreen';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import WatchScreen from './components/screens/watchScreen/WatchScreen'

import './_app.scss';
import SearchScreen from './components/screens/SearchScreen';
import SubscriptionScreen from './components/screens/subscriptionScreen/SubscriptionScreen';
import ChannelScreen from './components/screens/channelScreen/ChannelScreen';


const Layout = ({ children }) => {
    const [sidebar ,toggleSidebar] = useState(false);

    const handleToggleSidebar = () => toggleSidebar( value => !value);
    return (
        <React.Fragment>
        <Header handleToggleSidebar={handleToggleSidebar}/>
            <div className="app__container ">
                <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
                    <Container fluid className='app__main'>
                        { children }
                    </Container>
            </div>
        </React.Fragment>
    )
}

const App = () => {

 const {accessToken , loading} = useSelector(state => state.auth);

 const history = useHistory();

 useEffect(()=> {
     if(!loading && !accessToken){
        history.push('/auth')
     }

 },[accessToken , loading , history])


    return (
       <Switch>
         <Route path='/' exact>
            <Layout>
                <HomeScreen />
            </Layout>
        </Route>
        <Route path='/auth'>
            <LoginScreen />
        </Route>

         <Route path='/search/:query'>
            <Layout>
               <SearchScreen />
            </Layout>
         </Route>
         <Route path='/watch/:id'>
            <Layout>
               <WatchScreen />
            </Layout>
         </Route>
         <Route path='/feed/subscriptions'>
            <Layout>
               <SubscriptionScreen />
            </Layout>
         </Route>
         <Route path='/channel/:channelId'>
            <Layout>
               <ChannelScreen />
            </Layout>
         </Route>
        <Route>
            <Redirect to='/' />
        </Route>
       
         </Switch>
           
    )
}

export default App
