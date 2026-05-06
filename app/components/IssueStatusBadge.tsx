import React from "react";
import { Status } from "../generated/prisma/enums";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const currentStatus = statusMap[status];
  return <Badge color={currentStatus.color}>{currentStatus.label}</Badge>;
};

export default IssueStatusBadge;
