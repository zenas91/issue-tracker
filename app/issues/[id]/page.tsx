import { IssueStatusBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={paramValues.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPail;
