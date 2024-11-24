export function convertToParagraphs(text: string): JSX.Element[] {
  // Split the text by newline character
  const paragraphs = text.split("\n");

  // Wrap each paragraph in <p></p> and join them back into a single string
  return paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
}
