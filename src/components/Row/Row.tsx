"use client";

import { useRef, useState } from "react";
import { TableRowDataType } from "@/types";
import styles from "./styles.module.css";
import { getFieldsFromHTMLElement } from "@/helpers";

export function Row({ row }: { row: TableRowDataType }) {
  const [rowData, setRowData] = useState<TableRowDataType>(row);
  const [isReadonly, setIsReadonly] = useState(true);
  const rowRef = useRef(null);
  const { name, email, birthday_date, phone_number, address, id } = rowData;

  const onEditClickHandler = () => {
    setIsReadonly(!isReadonly);
  };

  const onSaveClickHandler = async () => {
    const fields = getFieldsFromHTMLElement({
      ref: rowRef.current!,
      names: Object.keys(rowData).filter((key) => key !== "id"),
    });
    const res = await fetch(
      `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      }
    );
    const data = await res.json();
    if (res.status !== 200) {
      alert(Object.entries(data));
      return;
    }
    setRowData(data);
  };
  return (
    <tr key={id} ref={rowRef}>
      <td className={styles.tableData}>
        <textarea
          name="name"
          readOnly={isReadonly}
          defaultValue={name}
          className={styles.tableDataTextarea}
        ></textarea>
      </td>
      <td className={styles.tableData}>
        <textarea
          name="email"
          readOnly={isReadonly}
          defaultValue={email}
          className={styles.tableDataTextarea}
        ></textarea>
      </td>
      <td className={styles.tableData}>
        <textarea
          name="birthday_date"
          readOnly={isReadonly}
          defaultValue={birthday_date}
          className={styles.tableDataTextarea}
        ></textarea>
      </td>
      <td className={styles.tableData}>
        <textarea
          name="phone_number"
          readOnly={isReadonly}
          defaultValue={phone_number}
          className={styles.tableDataTextarea}
        ></textarea>
      </td>
      <td className={styles.tableData}>
        <textarea
          name="address"
          readOnly={isReadonly}
          defaultValue={address}
          className={styles.tableDataTextarea}
        ></textarea>
      </td>
      <td className={styles.tableData}>
        <button onClick={onEditClickHandler} className={styles.btn}>
          {isReadonly ? "edit" : "dismiss"}
        </button>
        <button onClick={onSaveClickHandler} className={styles.btn}>
          save
        </button>
      </td>
    </tr>
  );
}
