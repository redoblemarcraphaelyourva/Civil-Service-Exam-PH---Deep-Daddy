import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * Pre-seeds 3 demo student personas and realistic exam logs into Firestore
 * if the database profile records of student are currently empty.
 */
export async function seedDemoAccountsIfEmpty(): Promise<void> {
  try {
    // Check if users collection already has seeded documents
    const existing = await getDocs(collection(db, "users"));
    if (!existing.empty) {
      console.log("Database already initialized; skipping administrative mock seeder.");
      return;
    }

    console.log("Database registry is empty. Initiating professional pre-seeds...");

    // 1. JOSE RIZAL (EXEMPLARY MASTER)
    const joseUid = "seed_user_jose";
    await setDoc(doc(db, "users", joseUid), {
      uid: joseUid,
      displayName: "Dr. Jose Rizal, MD",
      email: "jose.rizal@calamba.edu.ph",
      role: "student",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    });

    // Seed 3 exam sessions for Jose
    const joseAttempts = [
      { level: "Professional", score: 165, total: 180, seconds: 7200, isPractice: false, daysAgo: 2 },
      { level: "Professional", score: 172, total: 180, seconds: 6800, isPractice: false, daysAgo: 1 },
      { level: "Professional", score: 176, total: 180, seconds: 5900, isPractice: false, daysAgo: 0 },
    ];

    for (const [idx, attempt] of joseAttempts.entries()) {
      const attId = `att_jose_${idx}`;
      await setDoc(doc(db, "users", joseUid, "attempts", attId), {
        attemptId: attId,
        userId: joseUid,
        level: attempt.level,
        score: attempt.score,
        total: attempt.total,
        percentage: Math.round((attempt.score / attempt.total) * 100),
        elapsedSeconds: attempt.seconds,
        isPracticeMode: attempt.isPractice,
        category: "ALL",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * attempt.daysAgo).toISOString(),
      });
    }

    // 2. JUAN DELA CRUZ (PROFICIENT EXAMINEE)
    const juanUid = "seed_user_juan";
    await setDoc(doc(db, "users", juanUid), {
      uid: juanUid,
      displayName: "Juan Dela Cruz",
      email: "juan.delacruz@gov.ph",
      role: "student",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    });

    const juanAttempts = [
      { level: "Professional", score: 132, total: 180, seconds: 9100, isPractice: false, daysAgo: 3 },
      { level: "Professional", score: 144, total: 180, seconds: 8400, isPractice: false, daysAgo: 1 },
    ];

    for (const [idx, attempt] of juanAttempts.entries()) {
      const attId = `att_juan_${idx}`;
      await setDoc(doc(db, "users", juanUid, "attempts", attId), {
        attemptId: attId,
        userId: juanUid,
        level: attempt.level,
        score: attempt.score,
        total: attempt.total,
        percentage: Math.round((attempt.score / attempt.total) * 105 / 100), // realistic variance
        elapsedSeconds: attempt.seconds,
        isPracticeMode: attempt.isPractice,
        category: "ALL",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * attempt.daysAgo).toISOString(),
      });
    }

    // 3. MARIA CLARA SANTOS (DEVELOPING COMPLIER)
    const mariaUid = "seed_user_maria";
    await setDoc(doc(db, "users", mariaUid), {
      uid: mariaUid,
      displayName: "Maria Clara Santos",
      email: "maria.clara@ateneo.edu",
      role: "student",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    });

    const mariaAttempts = [
      { level: "Sub-Professional", score: 110, total: 180, seconds: 10500, isPractice: false, daysAgo: 4 },
      { level: "Sub-Professional", score: 122, total: 180, seconds: 9900, isPractice: false, daysAgo: 2 },
      { level: "Sub-Professional", score: 135, total: 180, seconds: 9200, isPractice: false, daysAgo: 0 },
    ];

    for (const [idx, attempt] of mariaAttempts.entries()) {
      const attId = `att_maria_${idx}`;
      await setDoc(doc(db, "users", mariaUid, "attempts", attId), {
        attemptId: attId,
        userId: mariaUid,
        level: attempt.level,
        score: attempt.score,
        total: attempt.total,
        percentage: Math.round((attempt.score / attempt.total) * 100),
        elapsedSeconds: attempt.seconds,
        isPracticeMode: attempt.isPractice,
        category: "ALL",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * attempt.daysAgo).toISOString(),
      });
    }

    console.log("Database demo metrics seeded successfully!");
  } catch (error) {
    console.error("Administrative pre-seeder experienced error:", error);
  }
}
