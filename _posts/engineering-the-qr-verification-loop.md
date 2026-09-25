---
title: "Scale at the Door: Designing Fraud-Resistant QR Attendance Loops"
excerpt: "What happens when 500 students scan into a lecture hall in under two minutes? Mitigating screenshot spoofing with rotating seeds, indexed schema constraints, and sub-second validation."
coverImage: "/assets/blog/blog-post-covers/jawz-9Ut0azurqg0-unsplash.webp"
date: "2025-09-28T14:00:00.000Z"
author:
  name: Leon Nduati
  picture: "/assets/blog/authors/IMG_7908.webp"
ogImage:
  url: "/assets/blog/blog-post-covers/jawz-9Ut0azurqg0-unsplash.webp"
tags: ["Systems", "Security"]
category: "Tech"
---

Every university has the same attendance problem.

A professor walks into an auditorium of four hundred students, passes around a paper attendance sheet, and twenty minutes later receives a paper covered in signatures—forty percent of which were forged by students signing on behalf of their roommates who are still asleep in their dorms.

When Strathmore University tasked us with proposing a digital attendance management system (`QR-AMS`), the administrative brief was deceptively simple: *“Just generate a QR code and let students scan it with their phones.”*

Anyone who has built production systems knows that "just" is the most dangerous word in software engineering.

Because as soon as you display a static QR code on a projector screen, the first student in the front row takes a screenshot with their iPhone, texts it to a WhatsApp group of three hundred people, and students three miles away check into class from their beds.

Here is how we re-engineered the verification loop to survive adversarial human behavior.

---

## 1. The Dynamic Time-Token Seed

To kill screenshot sharing, the QR code on the projector screen cannot be static. It must be an ephemeral, moving target.

We modeled our protocol on **TOTP** (Time-based One-Time Password, RFC 6238), the same mathematical mechanism used by two-factor authentication apps:

```
[Server Session Secret] + [Unix Timestamp // Step Window] ---> HMAC-SHA256 ---> 6-Digit Token / QR Seed
```

```php
// Conceptual token generation running on the lecturer's display client
public function generateEphemeralQrPayload(string $sessionId): string
{
    $timeStep = 5; // QR code regenerates every 5 seconds
    $window = floor(time() / $timeStep);
    
    $payload = json_encode([
        'session_id' => $sessionId,
        'window' => $window,
        'nonce' => bin2hex(random_bytes(8))
    ]);

    $signature = hash_hmac('sha256', $payload, config('app.qr_secret'));

    return base64_encode($payload . '.' . $signature);
}
```

By rotating the QR payload every five seconds, a student cannot screenshot the projector and text it across campus. By the time the image loads on someone else’s phone, the token window has expired and the server rejects the check-in as stale.

---

## 2. Surviving the 8:01 AM Database Stampede

When a lecture starts at 8:00 AM, students do not scan sequentially in an orderly queue.

Three hundred students pull out their phones and scan simultaneously within a 45-second window. In a relational database like MySQL, three hundred concurrent incoming writes trying to insert records into an `attendance_records` table can easily trigger deadlocks, row-lock contention, and connection pool exhaustion.

To guarantee response times remain under 200ms:
1. **Compound Unique Indexes:** We enforced `UNIQUE INDEX idx_student_session (student_id, session_id)` directly at the database engine level. This guarantees that even if a student rapidly double-taps the scan button on a spotty network, MySQL drops the duplicate insert instantly without running expensive PHP application validation queries.
2. **Read-Heavy Invalidation via Redis:** Session status and validity windows are verified against an in-memory Redis key before touching the persistent SQL storage. If the session has closed or the token signature is forged, the request is rejected at the edge without allocating a database connection.

---

## 3. The Physical Reality of Cracked Android Screens

Software architects love to design for clean laboratory conditions. In the real world:
- Twenty percent of student phones have cracked camera lenses.
- Projector bulbs in lecture halls are dim, washing out contrast on large screens.
- Fluorescent room lighting creates glare reflections on the projection surface.

If your QR code contains too much data (high payload density), the QR matrix becomes extremely tight, packed with thousands of microscopic black-and-white pixels. A phone camera three rows back with a smudged lens will fail to focus, creating an embarrassing bottleneck at the auditorium door.

To ensure instant scanning from fifteen feet away:
- We kept the QR payload tiny (under 64 bytes total).
- We set the QR Error Correction Level to **Level M (15%)**—high enough to tolerate projector glare and camera distortion, but low enough to keep the pixel blocks large and chunky.
- Average camera lock time dropped from 4.2 seconds to under 0.8 seconds.

---

## 4. Systems Thinking Is Human Thinking

Engineering a verification system is rarely just about writing clean code. It is about studying the friction points between human incentives, physical hardware limitations, and network infrastructure.

When you design for the messiness of real life, the system doesn't just work on paper—it holds the door open when hundreds of people are trying to walk through at once.
