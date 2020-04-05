import reorder from './reorder';
import { updateContactSequence } from './sequences';

export default function onDragEnd(result, list, updateList) {
  if (!result.destination) {
    return;
  }

  const newList = reorder(list, result.source.index, result.destination.index);

  updateList(newList);

  updateContactSequence(newList, result.destination.index);
}
