"use client";
import { app, auth, firestore } from "@/lib/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
} from "reactfire";
const queryClient = new QueryClient();
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseAppProvider firebaseApp={app}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>
    </QueryClientProvider>
  );
};
