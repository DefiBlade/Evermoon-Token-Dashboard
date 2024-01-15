const truncatedText = (text: string) => {
  return text.substring(0, 6) + "..." + text.slice(-4);
}

export default truncatedText