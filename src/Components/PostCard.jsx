import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({img, title, des, path}) => {
    return (
        <Link className="Link" to={`/single/${path}`}>
        <div className="card">
            <figure className="card-figure">
               <img src={img} alt="oo hoojor" className="card-img" />
            </figure>
            <h4 className="card-title">{title}</h4>
            <p className="para card-para">{des}</p>
        </div>
        </Link>
    )
}

export default PostCard
