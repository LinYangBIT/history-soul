// One illustration source for gallery, results and exported cards.
// Gandhi retains the prior illustration because the image service declined regeneration.
export function portraitURL(id, thumbnail = false) {
  return id === 'gandhi'
    ? './assets/characters/gandhi.svg'
    : `./assets/portraits-v3/${id}${thumbnail ? '-thumb' : ''}.webp`;
}
