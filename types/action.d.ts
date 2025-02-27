interface SignInWithOAuthParams {
    provider: "github";
    providerAccountId: string;
    user: {
        email: string;
        name: string;
        image: string;
        username: string;
    }
}