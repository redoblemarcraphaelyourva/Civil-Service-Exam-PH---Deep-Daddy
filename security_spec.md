# Security Specification: Civil Service Exam Portal

This security specification implements Attribute-Based Access Control (ABAC) securing user profiles and historic exam attempt diagnostic ledgers.

## 1. Data Invariants

1. **User Invariants**
   - A user profile can only be created by the authenticated owner (`request.auth.uid == userId`).
   - The default role on direct registration must be `student` to prevent privilege escalation.
   - Users cannot edit their own `role` or `createdAt` fields once registered.
   - Profile documents must contain all required schema keys (`uid`, `email`, `displayName`, `role`, `createdAt`).

2. **Attempt Invariants**
   - Attempt records must dwell within their corresponding owner's subcollection (`/users/{userId}/attempts/{attemptId}`).
   - An attempt cannot set `userId` to a mismatching identity.
   - Score and total values must be valid integers.
   - Once submitted, attempt records are terminal (immutable) to prevent results tampering.

3. **Admin Monitor Invariants**
   - A verified Administrative user listed in an `/admins/` document collection possesses master check read access across all examinee profiles and attempts to audit regional progress metrics.

## 2. Dirty Dozen Payloads (Mock Threat Scenarios)

The following payloads represent violations that the Firestore security system must reject:

1. **Payload 1 (Privilege Escalation)**: Authenticated user attempting to register themselves directly as an `admin` role in their profile.
2. **Payload 2 (Profile Shadow Keys)**: Injecting foreign status fields like `"isPremium": true` during user profile registration.
3. **Payload 3 (Identity Theft)**: Creating profile matching another user's authenticated UID.
4. **Payload 4 (Identity Cross-Polination)**: Writing a study session attempt under another student's subcollection path.
5. **Payload 5 (Mismatched UID Entry)**: Writing a study session where the nested `userId` values does not match the active auth UID.
6. **Payload 6 (Attempt Erasure)**: A student trying to delete their poor exam results to artificially skew passing rates.
7. **Payload 7 (Attempt Mutability)**: Editing are score values or timestamps on a completed exam ledger entry.
8. **Payload 8 (Quota Poisoning)**: Writing a mock attempt with massive descriptive strings over 10Kb to exhaust storage.
9. **Payload 9 (Cross-User List Scan)**: A student querying data from another student's exam results list.
10. **Payload 10 (Spoofed Timestamps)**: Forging `submittedAt` to bypass temporal audit tracking.
11. **Payload 11 (Unverified Email Write)**: Conducting active database edits with an unverified email address credential on verified contexts.
12. **Payload 12 (Shadow Field Injection on Attempt)**: Adding unexpected custom score manipulation keys in the attempt document.
