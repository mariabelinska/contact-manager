export function getSequenceAfterAdd(list) {
  const lastContactSequence = list.slice(-1)[0].sequence;

  return lastContactSequence + 1000;
}

export function getSequenceAfterDrag(list, index) {
  const isFirstIndex = index === 0;
  const isLastIndex = index + 1 === list.length;

  if (isLastIndex) {
    return parseFloat(list[list.length - 1].sequence) + 1000;
  }

  const previousSequence = isFirstIndex ? 0 : parseFloat(list[index - 1].sequence);
  const nextSequence = parseFloat(list[index + 1].sequence);
  const newSequence = (previousSequence + nextSequence) / 2;

  return newSequence;
}
