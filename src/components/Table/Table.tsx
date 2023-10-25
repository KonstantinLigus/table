import { TableRowDataType } from "@/types";
import styles from "./styles.module.css";
import { Row } from "../Row/Row";

export async function Table({ results }: { results: TableRowDataType[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableDataName}>name</th>
          <th className={styles.tableDataEmail}>email</th>
          <th className={styles.tableDataBirthday}>birthday date</th>
          <th className={styles.tableDataPhone}>phone number</th>
          <th className={styles.tableDataAddress}>address</th>
          <th className={styles.tableDataOptions}>options</th>
        </tr>
      </thead>
      <tbody>
        {results && results.map((row) => <Row row={row} key={row.id} />)}
      </tbody>
    </table>
  );
}
