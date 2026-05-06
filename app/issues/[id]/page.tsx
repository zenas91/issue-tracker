import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPail = async ({ params }: Props) => {
  const paramValues = await params;
  const id = parseInt(paramValues.id);

  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPail;
