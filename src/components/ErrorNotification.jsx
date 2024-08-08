/* eslint-disable react/prop-types */
import '../styles/ErrorNotification.css';

const ErrorNotification = ({message}) => {
  if (!message) return null;
  
  return (
    <div className="error-notification">
      {message}
    </div>
  );
};

export default ErrorNotification;
