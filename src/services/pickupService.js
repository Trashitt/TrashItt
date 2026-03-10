import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment
} from 'firebase/firestore';

export class PickupService {
  // Create a new pickup request
  static async createPickupRequest(pickupData) {
    try {
      const pickupRef = await addDoc(collection(db, 'pickupRequests'), {
        ...pickupData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return pickupRef.id;
    } catch (error) {
      console.error('Error creating pickup request:', error);
      throw error;
    }
  }

  // Get all pending pickup requests for collectors
  static subscribeToPendingRequests(callback) {
    const q = query(
      collection(db, 'pickupRequests'),
      where('status', '==', 'pending')
    );

    return onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      // Sort in JavaScript instead of Firestore
      requests.sort((a, b) => b.createdAt - a.createdAt);
      callback(requests);
    }, (error) => {
      console.error('Error fetching pending requests:', error);
      callback([]);
    });
  }

  // Get pickup requests for a specific user
  static subscribeToUserRequests(userId, callback) {
    const q = query(
      collection(db, 'pickupRequests'),
      where('userId', '==', userId)
    );

    return onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      // Sort in JavaScript instead of Firestore
      requests.sort((a, b) => b.createdAt - a.createdAt);
      callback(requests);
    }, (error) => {
      console.error('Error fetching user requests:', error);
      callback([]);
    });
  }

  // Get accepted requests for a specific collector
  static subscribeToCollectorRequests(collectorId, callback) {
    const q = query(
      collection(db, 'pickupRequests'),
      where('collectorId', '==', collectorId)
    );

    return onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Filter for accepted and in_progress status
        if (data.status === 'accepted' || data.status === 'in_progress' || data.status === 'completed') {
          requests.push({ id: doc.id, ...data });
        }
      });
      // Sort in JavaScript instead of Firestore
      requests.sort((a, b) => b.updatedAt - a.updatedAt);
      callback(requests);
    }, (error) => {
      console.error('Error fetching collector requests:', error);
      callback([]);
    });
  }

  // Accept a pickup request
  static async acceptPickupRequest(requestId, collectorId, collectorName) {
    try {
      const requestRef = doc(db, 'pickupRequests', requestId);
      await updateDoc(requestRef, {
        status: 'accepted',
        collectorId: collectorId,
        collectorName: collectorName,
        acceptedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error accepting pickup request:', error);
      throw error;
    }
  }

  // Start pickup (mark as in progress)
  static async startPickup(requestId) {
    try {
      const requestRef = doc(db, 'pickupRequests', requestId);
      await updateDoc(requestRef, {
        status: 'in_progress',
        startedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error starting pickup:', error);
      throw error;
    }
  }

  // Complete pickup and award points
  static async completePickup(requestId, userId, pointsToAward = 25) {
    try {
      // Update pickup request status
      const requestRef = doc(db, 'pickupRequests', requestId);
      await updateDoc(requestRef, {
        status: 'completed',
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Award points to user
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        points: increment(pointsToAward),
        reportsCount: increment(1),
        updatedAt: serverTimestamp()
      });

      return true;
    } catch (error) {
      console.error('Error completing pickup:', error);
      throw error;
    }
  }

  // Cancel pickup request
  static async cancelPickupRequest(requestId) {
    try {
      const requestRef = doc(db, 'pickupRequests', requestId);
      await updateDoc(requestRef, {
        status: 'cancelled',
        cancelledAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error cancelling pickup request:', error);
      throw error;
    }
  }

  // Get pickup statistics
  static async getPickupStats() {
    try {
      const querySnapshot = await getDocs(collection(db, 'pickupRequests'));
      const stats = {
        total: 0,
        pending: 0,
        accepted: 0,
        completed: 0,
        cancelled: 0
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;
        stats[data.status]++;
      });

      return stats;
    } catch (error) {
      console.error('Error getting pickup stats:', error);
      throw error;
    }
  }
}