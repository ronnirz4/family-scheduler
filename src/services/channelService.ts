import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';

// ---------------- CREATE CHANNEL ----------------
export async function createChannel(name: string, userId: string) {
  const code = generateCode(6);

  const channelRef = await addDoc(collection(db, 'channels'), {
    name,
    code,
    owner: userId,
    members: [userId],
    createdAt: Date.now(),
  });

  await linkUserToChannel(userId, channelRef.id);

  return { id: channelRef.id, code };
}

// ---------------- JOIN CHANNEL ----------------
export async function joinChannel(code: string, userId: string) {
  const q = query(collection(db, 'channels'), where('code', '==', code));
  const snap = await getDocs(q);

  if (snap.empty) {
    throw new Error('Channel not found');
  }

  const channelDoc = snap.docs[0];
  const data = channelDoc.data();

  if (!data.members.includes(userId)) {
    await updateDoc(doc(db, 'channels', channelDoc.id), {
      members: arrayUnion(userId),
    });
  }

  await linkUserToChannel(userId, channelDoc.id);

  return { id: channelDoc.id, name: data.name };
}

// ---------------- GET MY CHANNELS ----------------
export async function getMyChannels(userId: string) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) return [];

  const channelIds: string[] = userDoc.data().channels || [];

  const results = await Promise.all(
    channelIds.map(async (id) => {
      const c = await getDoc(doc(db, 'channels', id));
      return c.exists() ? { id, ...c.data() } : null;
    })
  );

  return results.filter(Boolean);
}

// ---------------- HELPERS ----------------
async function linkUserToChannel(userId: string, channelId: string) {
  const userRef = doc(db, 'users', userId);
  await setDoc(
    userRef,
    { channels: arrayUnion(channelId) },
    { merge: true }
  );
}

function generateCode(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}
