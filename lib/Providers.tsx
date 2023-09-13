"use client";
import { app, auth, firestore } from "@/lib/firebase";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
} from "reactfire";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
};
