import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({path, img, title, description, author}) => {
    return (
        <div className="homecard">
            <figure className="homecard-figure">
              <img src={img} alt="jan dara" className="homecard-img" />
            </figure>
            <div className="homecard-info">
               <h4 className="heading-4">{title}</h4>
               <p className="para homecard-para">{description}</p>
            </div>
            <div className="homecard-control">
              <button className="btn"><Link className="Link" to={`/singlepost/${path}`}>View Full Post</Link></button>
            </div>
            <p className="para">Posted By : {author}</p>
        </div>
    )
}

export default HomeCard
