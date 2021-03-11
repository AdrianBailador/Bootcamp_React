export const Note = ({ title, body }) => {
  return (
    <li>
      <p>
        <strong>{title}</strong>
      </p>
      <small>
        <time>{body}</time>
      </small>
    </li>
  );
};
