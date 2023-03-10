import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import {useState,useEffect} from 'react'

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
      //fetch here
function GetSpotifyUserData(){
  const [userSpotify,setUserSpotify] = useState("");
}

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        
{/* map here */}
        <p>link to comment on this playlist</p>
        <iframe  src="https://open.spotify.com/embed/playlist/5hGqFnseTbdhw78dNE13XN?utm_source=generator" width="83.3%" height="155" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}

            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ReviewForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;