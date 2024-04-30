import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectScreen } from "screeen/project-list";
import { TryUserArray } from "screeen/try-user-array";
import { UnAutnhenticatedApp } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "components/array-boundary";
import { FullPageErrorFallback } from "components/lib";


function App() {
  const { user } = useAuth()
  return ( 
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {
          user? <AuthenticatedApp /> : <UnAutnhenticatedApp />
        }
      </ErrorBoundary>
      
    </div>
  );
}

export default App;
