import React from "react";

function SocialMedia({ instagram, facebook, twitter, linkedin }) {
  return (
    <div>
      <a href={facebook} target="_blank">
        <i className="fab fa-facebook"></i>
      </a>
      <a href={twitter} target="_blank">
        <i className="fab fa-twitter"></i>
      </a>
      <a href={linkedin} target="_blank">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  );
}

SocialMedia.defaultProps = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com",
  twitter: "https://twitter.com/",
  linkedin: "https://www.linkedin.com/",
};

export default SocialMedia;
