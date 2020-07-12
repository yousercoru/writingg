import React from "react";

function MailTo({ mail, subject, children }) {
  const mailTo = () => {
    return `mailto:${mail}?subject = ${subject}`;
  };
  console.log(mail);
  return <a href={mailTo()}>{children}</a>;
}

export default MailTo;
