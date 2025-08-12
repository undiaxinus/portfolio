# User Login Table Structure for Firebase

## Firestore Collection: 'users'

### Document Structure:
```json
{
  "uid": "firebase_auth_uid",
  "email": "user@example.com",
  "displayName": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "photoURL": "https://example.com/photo.jpg",
  "phoneNumber": "+1234567890",
  "role": "user", // user, admin, moderator
  "isActive": true,
  "isEmailVerified": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "lastLoginAt": "2024-01-15T10:30:00Z",
  "loginCount": 1,
  "preferences": {
    "theme": "light",
    "language": "en",
    "notifications": true
  },
  "profile": {
    "bio": "User biography",
    "website": "https://userwebsite.com",
    "location": "City, Country",
    "dateOfBirth": "1990-01-01"
  }
}
```

## Alternative: SQL Table Structure (if using traditional database)

```sql
CREATE TABLE users (
    id VARCHAR(128) PRIMARY KEY, -- Firebase UID
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    photo_url TEXT,
    phone_number VARCHAR(20),
    role ENUM('user', 'admin', 'moderator') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    login_count INT DEFAULT 0,
    
    -- Indexes
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active),
    INDEX idx_created (created_at)
);

-- User Preferences Table
CREATE TABLE user_preferences (
    user_id VARCHAR(128) PRIMARY KEY,
    theme ENUM('light', 'dark') DEFAULT 'light',
    language VARCHAR(5) DEFAULT 'en',
    notifications BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Profile Table
CREATE TABLE user_profiles (
    user_id VARCHAR(128) PRIMARY KEY,
    bio TEXT,
    website VARCHAR(255),
    location VARCHAR(100),
    date_of_birth DATE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Angular Service for User Management

### auth.service.ts
```typescript
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = user(this.auth);

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // Register new user
  async register(email: string, password: string, userData: any) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = credential.user.uid;
      
      // Create user document in Firestore
      const userDoc = {
        uid,
        email,
        displayName: userData.displayName || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        photoURL: '',
        phoneNumber: userData.phoneNumber || '',
        role: 'user',
        isActive: true,
        isEmailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        loginCount: 1,
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true
        },
        profile: {
          bio: '',
          website: '',
          location: '',
          dateOfBirth: ''
        }
      };
      
      await setDoc(doc(this.firestore, 'users', uid), userDoc);
      return credential;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      
      // Update last login and login count
      const userRef = doc(this.firestore, 'users', credential.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const currentCount = userDoc.data()['loginCount'] || 0;
        await updateDoc(userRef, {
          lastLoginAt: serverTimestamp(),
          loginCount: currentCount + 1,
          updatedAt: serverTimestamp()
        });
      }
      
      return credential;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    return await signOut(this.auth);
  }

  // Get user data
  async getUserData(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  // Update user profile
  async updateUserProfile(uid: string, data: any) {
    const userRef = doc(this.firestore, 'users', uid);
    return await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }
}
```

### user.interface.ts
```typescript
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'user' | 'admin' | 'moderator';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: any;
  updatedAt: any;
  lastLoginAt?: any;
  loginCount: number;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
  profile: {
    bio?: string;
    website?: string;
    location?: string;
    dateOfBirth?: string;
  };
}
```

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow admins to read all users
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Usage Example in Component

```typescript
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onLogin()">
      <input [(ngModel)]="email" type="email" placeholder="Email" required>
      <input [(ngModel)]="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
```

This structure provides a comprehensive user management system with authentication, profile data, and proper security rules!