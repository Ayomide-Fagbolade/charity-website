import { auth, db } from "./config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    User
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserProfile } from "../types";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data() as UserProfile);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signup = async (email: string, pass: string) => {
        // Domain restriction
        const domain = email.split('@')[1];
        if (domain !== 'um6p.ma' && domain !== 'student.um6p.ma') {
            throw new Error("Registration is restricted to @um6p.ma or @student.um6p.ma domains.");
        }

        const { user } = await createUserWithEmailAndPassword(auth, email, pass);

        // Create profile
        const profile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            role: 'student',
            dps_balance: 0,
            badges: {
                donor: 'None',
                seller: 'None',
                buyer: 'None'
            },
            stats: {
                total_donated: 0,
                total_sales: 0,
                total_purchases: 0,
                total_items_donated: 0
            },
            emailVerified: false
        };

        await setDoc(doc(db, "users", user.uid), profile);
        await sendEmailVerification(user);
        return user;
    };

    const login = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const logout = () => signOut(auth);

    const resendEmail = async () => {
        if (user) {
            await sendEmailVerification(user);
        }
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    return { user, profile, loading, signup, login, logout, resendEmail, resetPassword };
}
