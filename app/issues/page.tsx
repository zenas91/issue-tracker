import { prisma } from "@/prisma/client";
import Pagination from "../components/Pagination";
import { Status } from "../generated/prisma/enums";
import IssueAction from "./IssueAction";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const _searchParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(_searchParams.status)
    ? _searchParams.status
    : undefined;
  const orderBy = columnNames.includes(_searchParams.orderBy)
    ? { [_searchParams.orderBy]: "asc" }
    : undefined;
  const where = { status };

  const page = parseInt(_searchParams.page) || 1;
  const pageSize = 10;

  const [issues, issuesCount] = await Promise.all([
    prisma.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.issue.count({ where }),
  ]);

  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={_searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        itemCount={issuesCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project Issues.",
};

export default IssuesPage;
