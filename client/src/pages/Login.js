const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://song-exploder.herokuapp.com/login";

const Login = () => (
  <div>
    <button href={LOGIN_URI}>Log in to Spotify</button>
  </div>
);

export default Login;
