---
title: "Rolling AES Without the Black Box: Cryptographic Primitives and Key Hygiene"
excerpt: "A look into symmetric encryption in Python: why AES-CBC will bite you if you mishandle padding, moving to authenticated AES-GCM, and building lightweight utilities that run anywhere."
coverImage: "/assets/blog/blog-post-covers/mr-cup-fabien-barral-Mwuod2cm8g4-unsplash.webp"
date: "2025-11-14T09:15:00.000Z"
author:
  name: Leon Nduati
  picture: "/assets/blog/authors/IMG_7908.webp"
ogImage:
  url: "/assets/blog/blog-post-covers/mr-cup-fabien-barral-Mwuod2cm8g4-unsplash.webp"
tags: ["Security", "Systems"]
category: "Tech"
---

Most developers treat cryptography like witchcraft: you import a library, call `encrypt(data, password)`, pray that no exception is thrown, and commit the code.

The danger of cryptography isn't that broken code crashes. The danger is that broken code *succeeds*.

A completely broken encryption implementation will happily encrypt your plaintext, produce an intimidating string of base64 characters, and decrypt it cleanly on the other end—while being totally vulnerable to a twenty-year-old padding oracle attack or nonce reuse exploit that allows an attacker to recover your plaintext without ever knowing your key.

When I engineered the `secure-aes` cryptographic utility in Python, my goal was to build a zero-dependency CLI tool for encrypting sensitive configuration payloads and keys while rigorously respecting cryptographic boundaries.

Here is what you actually need to know about implementing AES in production.

---

## 1. AES Is Not an Encryption Algorithm (It's a Block Cipher)

The first misconception junior engineers have is that "AES" takes arbitrary data and encrypts it.

AES (Advanced Encryption Standard) doesn't know what a file, a JSON string, or a password is. AES is a **block cipher** that takes exactly 16 bytes of data (128 bits) and a key (128, 192, or 256 bits), and maps that 16-byte block into a pseudorandom 16-byte block of ciphertext through 10 to 14 rounds of substitution-permutation network operations.

If your message is 47 bytes long, AES by itself cannot encrypt it. You need a **Mode of Operation**.

```
Plaintext (47 bytes) ---> [Padding to 48 bytes] ---> [Mode of Operation] ---> Ciphertext
```

---

## 2. The Danger of AES-CBC vs the Safety of AES-GCM

For decades, the standard choice was **AES-CBC** (Cipher Block Chaining). In CBC mode, each block of plaintext is XORed with the previous ciphertext block before being encrypted. The first block is XORed with an **Initialization Vector (IV)**.

CBC mode has two major architectural liabilities:
1. **Padding Oracle Attacks:** Because CBC requires data to be padded to multiples of 16 bytes (usually with PKCS#7), an attacker who can observe whether a decryption error was due to bad padding or bad data can mathematically recover the entire plaintext byte-by-byte.
2. **Lack of Integrity Verification:** CBC encrypts, but it does not authenticate. An attacker who intercepts your ciphertext in transit can flip bits in block $N$, causing predictable alterations in block $N+1$ without the recipient ever knowing the payload was tampered with.

That is why modern systems should default to **AES-GCM** (Galois/Counter Mode).

```python
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def encrypt_payload(data: bytes, key: bytes) -> bytes:
    # 96-bit nonce (12 bytes) recommended for AES-GCM
    nonce = os.urandom(12)
    aesgcm = AESGCM(key)
    
    # Encrypts plaintext and appends a 16-byte cryptographic authentication tag
    ciphertext = aesgcm.encrypt(nonce, data, associated_data=None)
    
    # Store nonce alongside ciphertext (nonce does not need to be secret, only unique)
    return nonce + ciphertext

def decrypt_payload(package: bytes, key: bytes) -> bytes:
    nonce = package[:12]
    ciphertext = package[12:]
    
    aesgcm = AESGCM(key)
    # If a single bit was modified in transit, this throws an InvalidTag exception immediately
    return aesgcm.decrypt(nonce, ciphertext, associated_data=None)
```

AES-GCM provides **Authenticated Encryption with Associated Data (AEAD)**. It simultaneously encrypts the data and calculates an authentication tag. If an attacker modifies even one bit of the ciphertext or nonce, decryption fails completely before any plaintext is ever parsed.

---

## 3. The Nonce Catastrophe

In AES-GCM, the initialization vector is called a **nonce** ("number used once").

The rule of GCM is absolute: **Never, under any circumstances, use the same (Key, Nonce) pair twice.**

If you encrypt two different messages with the same key and the same nonce in GCM mode, an adversary can XOR the ciphertexts together to eliminate the keystream and completely recover the authentication subkey. Once they have that, they can forge messages at will.

If you generate a 96-bit nonce using cryptographically secure random bytes (`os.urandom(12)`), the birthday paradox means the probability of a collision is negligible up to roughly $2^{32}$ messages. But for high-throughput automated systems, an explicit monotonic counter or structured nonce is even safer.

---

## 4. Key Derivation: Passwords Are Not Keys

A user typing `MyPassword123!` has not given you a 256-bit cryptographic key. They have given you an entropy-poor ASCII string.

If you just run `hashlib.sha256(password.encode())`, you are vulnerable to GPU-accelerated rainbow table attacks. A modern graphics card can compute billions of SHA-256 hashes per second.

You must pass user passwords through a computationally expensive **Key Derivation Function (KDF)** like **PBKDF2**, **Argon2id**, or **scrypt**:

```python
from cryptography.hazmat.primitives.kdf.scrypt import Scrypt

def derive_key(passphrase: str, salt: bytes) -> bytes:
    kdf = Scrypt(
        salt=salt,
        length=32,      # 256-bit output key
        n=2**14,        # CPU/memory cost parameter
        r=8,            # Block size parameter
        p=1             # Parallelization parameter
    )
    return kdf.derive(passphrase.encode())
```

Cryptographic engineering is not about being clever. It is about understanding the boundaries of mathematics, assuming your opponent knows every line of your algorithm, and refusing to cut corners when handling secrets.
