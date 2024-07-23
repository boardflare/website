import { useMsal } from "@azure/msal-react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Login component
const Login = () => {
    const { instance } = useMsal();

    const login = async () => {
        try {
            const response = await instance.loginPopup();
            console.log("Login was successful", response);
        } catch (e) {
            console.error("Error during login:", e);
        }
    };

    return <button onClick={login}>Login</button>;
};

// Component
const Subscription = () => {
    const router = useRouter();

    useEffect(() => {
        console.log('URL Parameters:', router.query);
    }, [router.query]);

    return <Login />;
};

export default Subscription;