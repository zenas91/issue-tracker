import { prisma } from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);
  return <IssuesSummary open={open} inProgress={inProgress} closed={closed} />;
}
