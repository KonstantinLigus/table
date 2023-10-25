import Link from "next/link";
import styles from "./styles.module.css";
type PaginationType = {
  count: number;
  next: string;
  previous: string;
};

function getParams(url: string, name: string) {
  const params = new URLSearchParams(url);
  return {
    limit: Number(
      params.get(
        "https://technical-task-api.icapgroupgmbh.com/api/table/?limit"
      )
    ),
    offset: Number(params.get("offset")),
    name,
  };
}

export function Pagination({ count, next, previous }: PaginationType) {
  const buttons = [getParams(previous, "previous"), getParams(next, "next")];
  const totalPages = Math.ceil(count / 10);
  const CurrentPage = Math.ceil(
    (buttons[0].offset + buttons[1].offset) / (10 * 2)
  );

  return (
    <>
      <ul className={styles.navList}>
        {buttons.map((button) => {
          const { limit, offset, name } = button;
          return (
            <li key={name}>
              <Link
                href={`/table?limit=${limit}&offset=${offset}`}
                className={styles.navBtn}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={styles.counter}>
        {CurrentPage}/{totalPages}
      </p>
    </>
  );
}
