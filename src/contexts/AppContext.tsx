//Combines top level contexts
import { PageContextProvider } from "./PageContext";
import { PenContextProvider } from "./PenContext";

const AppContextProvider = (children : any) => (
    <PageContextProvider>
        <PenContextProvider>
            {children}
        </PenContextProvider>
    </PageContextProvider>
)

export default AppContextProvider;