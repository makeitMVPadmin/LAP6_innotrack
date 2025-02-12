import { useContentListener } from "@/functions/fetchContent";

export default function ContentList() {
  const { contentList } = useContentListener();

  return (
    <div>
      <h2>Fetched Content</h2>
      <ul>
        {contentList.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> - {item.publisher}
          </li>
        ))}
      </ul>
    </div>
  );
}
