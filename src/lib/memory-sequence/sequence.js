export function nextSequenceValue(sequence, cellCount) {
  if (cellCount <= 0) return 0;
  let candidate = Math.floor(Math.random() * cellCount);
  const n = sequence.length;
  if (n >= 2 && sequence[n - 1] === sequence[n - 2] && sequence[n - 1] === candidate && cellCount > 1) {
    candidate = (candidate + 1 + Math.floor(Math.random() * (cellCount - 1))) % cellCount;
  }
  return candidate;
}

export function extendSequence(sequence, cellCount) {
  return [...sequence, nextSequenceValue(sequence, cellCount)];
}
