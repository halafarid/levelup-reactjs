import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import axios from "axios";


import Navbar from "./components/core/navbar";
import Home from "./components/core/home";
import About from "./components/core/about";
import PageNotFound from "./components/core/pageNotFound";
import Follows from "./components/follows";
import CourseData from "./components/forms/courseData";
import CourseDetails from "./components/courses/courseDetails";
import CourseLessons from "./components/courses/courseLessons";
import Footer from "./components/core/footer";
import Profile from "./components/profile";
import Payment from "./components/features/payment";
import PaymentForm from "./components/forms/paymentForm";
import SigningForm from "./components/authentication/signingForm";

const App = () => {
 
  const [Instructor] = useState([
    {
      id: "1",
      imgUrl: "",
      name: "George Richards",
      job: "Professional skaters association",
      rating: "5",
      reviews: "3"
    },
    {
      id: "2",
      imgUrl: "",
      name: "Namrata Parmar",
      job: "Photographer, Travel Bloger",
      rating: "4",
      reviews: "20"
    },

    {
      id: "3",
      imgUrl: "",
      name: "Robert Richards",
      job: "Professional skaters association",
      rating: "3",
      reviews: "12"
    },
    {
      id: "4",
      imgUrl: "",
      name: "Betty Milner",
      job: "Teacher",
      rating: "3",
      reviews: "14"
    }
  ]);
  axios.interceptors.request.use(function (config) {
  const jwt = localStorage.getItem("JWT");
    config.headers.Authorization =  jwt;

    return config;
  });
      
  const type = localStorage.getItem("UserType"); 
  
  return (
    <React.Fragment>
      {localStorage.getItem('JWT') ? 
        <Navbar type={type} />
      :
        null
      }
      <Switch>
        <Route
          path="/home"
          render={props => <Home {...props} Instructor={Instructor} type={type} />}
        />

        <Route path="/about" render={() => <About />} />


        <Route path="/profile/:id" render={props => <Profile {...props} type={type} />} />
        <Route path="/profile/edit" render={props => <Profile {...props} type={type} />} />

        <Route path="/profile" render={props =>
         <Profile {...props}
          type={type}
         />} />

        <Route
          path="/courses/:id/details"
          render={props => <CourseDetails {...props} />}
        />

        <Route
          path="/courses/:id/reviews"
          render={props => <CourseDetails {...props} />}
        />

        <Route
          path="/courses/:id/edit"
          render={props => <CourseData {...props} />}
        />

        <Route path="/courses/:id/lessons" component={CourseLessons} />
        <Route path="/courses/:id/paymentform" component={PaymentForm} />

        <Route
          path="/courses/add"
          render={props => <CourseData {...props} />}
        />
        <Route
          path="/login"
          render={props => <SigningForm {...props} />}
        />
        <Route
          path="/register"
          render={props => <SigningForm {...props} />}
        />

        <Route path="/notfound" component={PageNotFound} />
        <Route
          path="/following"
          render={ props => <Follows {...props} Instructor={Instructor} />}
        />
        <Route
          path="/followers"
          render={ props => <Follows {...props} Instructor={Instructor} />}
        />
        <Route path="/shoppingcart" component={Payment} />
        <Redirect exact from="/" to="/login" />
        <Redirect to="/notfound" />
      </Switch>

      {localStorage.getItem("JWT") !== null ? 
      <Footer/>
      :
      null
      }
    </React.Fragment>
  );
};

export default App;
