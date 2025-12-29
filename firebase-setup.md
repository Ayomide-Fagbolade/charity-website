# Firebase Setup Instructions for BridgeSeed

To complete the setup of your BridgeSeed Foundation platform, please follow these steps:

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it `BridgeSeed Foundation`.
3. (Optional) Disable Google Analytics for this project.

### 2. Register Web App
1. Click the **Web icon (</>)** to register a new web app.
2. Name it `BridgeSeed Web`.
3. Copy the `firebaseConfig` object values.

### 3. Update Environment Variables
Create a file named `.env.local` in the project root and paste your config values:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```
*Note: This file is ignored by git for security.*

### 4. Enable Authentication
1. In Firebase Console, go to **Authentication** > **Get Started**.
2. Enable the **Email/Password** provider.

### 5. Enable Firestore Database
1. Go to **Firestore Database** > **Create Database**.
2. Select a location near Morocco (e.g., `europe-west`).
3. Start in **Production Mode**.
4. Deploy the rules provided in `firestore.rules` (copy-paste from the file in this repo).

### 6. Enable Storage
1. Go to **Storage** > **Get Started**.
2. Set up the default bucket.

### 7. Initial Admin Setup
Since signups default to the `student` role, you'll need to manually change your role to `admin` in the Firestore `users` collection for the first time:
1. Sign up on the website with your `@student.um6p.ma` email.
2. Go to Firestore Console, find your user document in the `users` collection.
3. Change the `role` field from `"student"` to `"admin"`.

---
**You are now ready to go!**
You can access the admin panel at `/admin` and start verifying transactions.
