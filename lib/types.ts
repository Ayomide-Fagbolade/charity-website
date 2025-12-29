export type UserRole = 'student' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  dps_balance: number;
  badges: {
    donor: string; // e.g., "Bronze", "Silver", "Gold"
    seller: string; // e.g., "Rising Seller", "Top Seller"
    buyer: string;  // e.g., "Community Supporter"
  };
  stats: {
    total_donated: number;
    total_sales: number;
    total_purchases: number;
    total_items_donated: number;
  };
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  isAnonymous?: boolean;
}

export type MarketplaceItemStatus = 'available' | 'pending' | 'sold';

export interface MarketplaceItem {
  itemId: string;
  sellerId: string;
  sellerName: string;
  sellerWhatsApp?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  status: MarketplaceItemStatus;
  receiptUrl?: string; // Uploaded by buyer when pending
  buyerId?: string;
  createdAt: any; // Firestore Timestamp
}

export type TransactionStatus = 'pending' | 'verified' | 'rejected';

export interface Donation {
  donationId: string;
  userId: string;
  userName: string;
  amount?: number; // Optional for non-cash
  type: "cash" | "item";
  itemDescription?: string;
  projectId: string;
  projectName: string;
  status: TransactionStatus;
  rejectionReason?: string;
  referenceId: string;
  receiptUrl: string; // Proof of payment OR Photo of item
  createdAt: any;
}

export interface Project {
  projectId: string;
  title: string;
  goal: number;
  currentAmount: number;
  description: string;
  category: 'relief' | 'foundation';
  imageUrl?: string;
}
export interface BadgeRequest {
  requestId: string;
  userId: string;
  userName: string;
  badgeType: 'donor' | 'seller' | 'buyer';
  badgeName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}
