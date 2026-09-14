/**
 * Parses a long policy body text into separate numbered sections.
 * Splits on patterns like: "1. Title", "2. Title", etc.
 */
export interface ParsedSection {
  title: string;
  body: string;
}

export function parsePolicyBody(text: string): ParsedSection[] {
  // Split on patterns like "1. ", "2. ", "10. " etc. at word boundaries
  const parts = text.split(/(?=\b\d{1,2}\.\s+[A-Z])/);

  const sections: ParsedSection[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Match "1. Title Rest of content" or "1. Title\nRest of content"
    const match = trimmed.match(/^(\d{1,2}\.\s+[^\n.]{2,60?}?)\s+([\s\S]+)$/);
    if (match) {
      sections.push({
        title: match[1].trim(),
        body: match[2].trim(),
      });
    } else {
      // Fallback: treat whole thing as body with no title
      sections.push({ title: "", body: trimmed });
    }
  }

  return sections.filter((s) => s.body.length > 0);
}
