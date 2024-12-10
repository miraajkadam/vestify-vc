import crypto from "crypto";

/**
 * Hash a value using SHA-256
 * @param value - The input value to hash
 * @returns A SHA-256 hash as a hexadecimal string
 */
const hash = (value: string): string => {
  return crypto.createHash("sha256").update(value).digest("hex");
};

/**
 * Generate the Merkle Root for a list of data items
 * @param items - Array of strings representing the data items
 * @returns The Merkle root as a string
 */
const generateMerkleRoot = (items: string[]): string => {
  if (items.length === 0) {
    throw new Error("Cannot generate Merkle root for an empty array.");
  }

  // Base case: If there's only one item, return its hash
  if (items.length === 1) {
    return hash(items[0]);
  }

  // Hash all items
  let hashes = items.map(hash);

  // Build the tree until we have a single root
  while (hashes.length > 1) {
    const tempHashes: string[] = [];

    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = hashes[i + 1] || left; // If odd, duplicate the last hash
      const combinedHash = hash(left + right);
      tempHashes.push(combinedHash);
    }

    hashes = tempHashes;
  }

  return hashes[0]; // The single root hash
};
