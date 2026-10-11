import type { WhitepaperBlock } from '@/lib/whitepaper-content';

/**
 * Renders `**bold**` spans without dangerouslySetInnerHTML.
 *
 * The content is generated from our own markdown source rather than
 * user input, so injection is not the live concern — but parsing to
 * real elements keeps the markup predictable and means a stray
 * asterisk degrades to visible text instead of broken HTML.
 */
function inline(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/**
 * A whitepaper section's body.
 *
 * Headings stay as real h3 elements and tables as real table markup,
 * which is the whole point of publishing these sections as pages: an
 * answer engine can lift a figure out of a table here, where it could
 * not from the PDF.
 */
export default function WhitepaperBlocks({ blocks }: { blocks: WhitepaperBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        const k = `b${i}`;
        switch (b.t) {
          case 'h3':
            return (
              <h3 key={k} className="wp-h3">
                {b.text}
              </h3>
            );

          case 'p':
            return (
              <p key={k} className="wp-p">
                {inline(b.text, k)}
              </p>
            );

          case 'caption':
            return (
              <p key={k} className="wp-caption">
                {inline(b.text, k)}
              </p>
            );

          case 'quote':
            return (
              <blockquote key={k} className="wp-quote">
                {inline(b.text, k)}
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={k} className="wp-list">
                {b.items.map((it, j) => (
                  <li key={`${k}-${j}`}>{inline(it, `${k}-${j}`)}</li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={k} className="wp-list wp-list-ordered">
                {b.items.map((it, j) => (
                  <li key={`${k}-${j}`}>{inline(it, `${k}-${j}`)}</li>
                ))}
              </ol>
            );

          case 'table':
            // Wide financial tables need their own scroll container so the
            // page body never scrolls sideways on a phone.
            return (
              <div key={k} className="wp-table-wrap">
                <table className="wp-table">
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={`${k}-h${j}`}>{inline(h, `${k}-h${j}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={`${k}-r${j}`}>
                        {row.map((cell, c) => (
                          <td key={`${k}-r${j}-c${c}`}>{inline(cell, `${k}-r${j}-c${c}`)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
