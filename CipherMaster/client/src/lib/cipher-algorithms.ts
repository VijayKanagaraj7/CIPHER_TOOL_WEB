export interface RailFenceResult {
  encrypted: string;
  visualization: string[][];
}

export interface RowTranspositionResult {
  encrypted: string;
  matrix: string[][];
  keyOrder: number[];
}

export function railFenceEncrypt(message: string, rails: number): RailFenceResult {
  if (rails < 2) throw new Error("Number of rails must be at least 2");
  if (!message) return { encrypted: "", visualization: [] };

  const cleanMessage = message.replace(/\s/g, "").toUpperCase();
  const fence: string[][] = Array(rails).fill(null).map(() => []);
  const visualization: string[][] = Array(rails).fill(null).map(() => []);
  
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < cleanMessage.length; i++) {
    fence[rail].push(cleanMessage[i]);
    
    // Create visualization
    for (let r = 0; r < rails; r++) {
      if (r === rail) {
        visualization[r][i] = cleanMessage[i];
      } else {
        visualization[r][i] = ".";
      }
    }

    rail += direction;
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }

  const encrypted = fence.map(row => row.join("")).join("");
  
  return { encrypted, visualization };
}

export function rowTranspositionEncrypt(message: string, key: string): RowTranspositionResult {
  if (!key) throw new Error("Key cannot be empty");
  if (!message) return { encrypted: "", matrix: [], keyOrder: [] };

  const cleanMessage = message.replace(/\s/g, "").toUpperCase();
  const cleanKey = key.toUpperCase();
  
  // Create key order based on alphabetical sorting
  const keyChars = cleanKey.split("");
  const sortedKey = [...keyChars].sort();
  const keyOrder = keyChars.map(char => {
    const index = sortedKey.indexOf(char);
    sortedKey[index] = null; // Mark as used
    return index + 1;
  });

  // Create matrix
  const cols = cleanKey.length;
  const rows = Math.ceil(cleanMessage.length / cols);
  const matrix: string[][] = Array(rows).fill(null).map(() => Array(cols).fill(""));

  // Fill matrix row by row
  for (let i = 0; i < cleanMessage.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    matrix[row][col] = cleanMessage[i];
  }

  // Read columns in key order
  let encrypted = "";
  const sortedIndices = keyOrder
    .map((order, index) => ({ order, index }))
    .sort((a, b) => a.order - b.order);

  for (const { index } of sortedIndices) {
    for (let row = 0; row < rows; row++) {
      if (matrix[row][index]) {
        encrypted += matrix[row][index];
      }
    }
  }

  return { encrypted, matrix, keyOrder };
}
