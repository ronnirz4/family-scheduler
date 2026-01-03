import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../../firebase';

let initialized = false;

export function initAuth(onReady: () => void) {
  if (initialized) return;
  initialized = true;

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await signInAnonymously(auth);
    }
    onReady();
  });
}
