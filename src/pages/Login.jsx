import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Qui andrà la logica di autenticazione
        navigate("/dashboard");
    };

    return (
        <div>
            <h2>Login Page hallo test</h2>
            <button onClick={handleLogin}>Login test</button>
        </div>
    );
}

export default Login;
