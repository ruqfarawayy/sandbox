import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
export const Recaptcha = ({ onChange }) => {
 const [isVerified, setIsVerified] = useState(false);
 const recaptchaRef = useRef(null);

 const onTokenChange = (token) => {
   setIsVerified(true);
   onChange(token);
 };

 const onExpire = () => {
   setIsVerified(false);
 };
  return (
   <ReCAPTCHA
      ref={recaptchaRef}
      sitekey="6Lfg9AclAAAAADMbRmkGMLxNkIReH0DK1Ed8TdgF"
      onChange={onTokenChange}
      onExpired={onExpire}
      size="normal"
    />
  );
};
