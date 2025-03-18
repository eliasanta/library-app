import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Qui andrà la logica di autenticazione
        console.log("login click")
        navigate("/dashboard");
    };

    return (
        <div>
            <h2>Login Page hallo</h2>
            <button onClick={handleLogin}>Login test 3</button>
        </div>
    );
}

export default Login;
