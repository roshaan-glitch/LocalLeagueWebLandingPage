import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

export function useFirebaseData<T>(path: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(db, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val() as T);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [path]);

  return { data, loading };
}
