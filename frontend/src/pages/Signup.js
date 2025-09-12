import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button disabled={isLoading} type="submit">Sign Up</button>
            {isLoading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}
export default Signup;