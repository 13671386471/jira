
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context"


export const AppProviders=({children}: {children: React.ReactNode}) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}