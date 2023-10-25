import { Pagination } from "@/components/Pagination/Pagination";
import { Table } from "@/components/Table/Table";

async function getTableData({
  limit = 10,
  offset = 1,
}: {
  limit?: number;
  offset?: number;
}) {
  const res = await fetch(
    `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();
  return data;
}

export default async function TablePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const limit = searchParams?.limit ? Number(searchParams.limit) : 10;
  const offset = searchParams?.offset ? Number(searchParams.offset) : 0;
  const { count, next, previous, results } = await getTableData({
    limit,
    offset,
  });

  return (
    <>
      <Table results={results} />
      <Pagination count={count} next={next} previous={previous} />
    </>
  );
}
