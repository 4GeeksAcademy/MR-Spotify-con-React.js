import React from "react";
import Spotify from"./Spotify";
//include images into your bundle
import spotify from "../../img/spotify.png";

//create your first component
const Home = () => {
	return (
		<div className="container text-center">
			<img className="logo" src={spotify} />
			<Spotify/>
		</div>
	);
};

export default Home;
