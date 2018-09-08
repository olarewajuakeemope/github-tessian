export const getDimension = (dimension: string, widthOffset: number = 100, smRowHeight: number = 300) => {
  if (window.innerWidth > 600) {
    return dimension === 'height' ? 200 : window.innerWidth - widthOffset
  } else {
    return dimension === 'height' ? smRowHeight : window.innerWidth
  }
}
