import { useNavigate } from 'react-router-dom';

const Mainpage = () => {
  const navigate = useNavigate();

  const handleSignUpLawyer = () => {
    navigate('/signuplawyer');
  };

  const handleSignUpClient = () => {
    navigate('/signupclient');
  };

  const handleLoginLawyer = () => {
    navigate('/loginlawyer');
  };

  const handleLoginClient = () => {
    navigate('/loginclient');
  };

  return (
    <div className='containing'>
      <button onClick={handleSignUpLawyer}>sign up as a lawyer</button>
      <button onClick={handleSignUpClient}>sign up as a client</button>
      <button onClick={handleLoginLawyer}>login as a lawyer</button>
      <button onClick={handleLoginClient}>login as a client</button>
    </div>
  );
};

export default Mainpage;
