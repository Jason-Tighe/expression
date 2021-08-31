import React, { useState } from 'react';

const InfoBar = ({ room }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<div> online </div>
			<h3>{room}</h3>
		</div>
		<div className="rightInnerContainer">
			<a href="/"></a>
		</div>
	</div>
);

export default InfoBar;
