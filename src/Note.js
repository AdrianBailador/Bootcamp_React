export const Note = ({ content, date }) => {
  return (
    <li>
      <p>
        <strong>{content}</strong>
      </p>
      <small>
        <time>{date}</time>
      </small>
    </li>
  );
};
