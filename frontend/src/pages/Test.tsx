import { FormEvent } from "react";
import { useLoginMutation, UserInput } from "../__generated__/types"

export default function TestPage () {
    const [login] = useLoginMutation();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson);
        const userData = await login({
            variables: { data: formJson as UserInput },
        });
        console.log(userData);
    }
    

    return (
        <>
            <h1>Test Page</h1>
            <section>
                <h2>Login form</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Email
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Login" />
                </form>
            </section>
        </>
        

    )
}