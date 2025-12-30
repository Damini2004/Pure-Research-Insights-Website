
"use client"

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubmissions, type Submission } from "@/services/submissionService";
import { getConferences, type Conference } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";

export default function ApprovedPapersTable() {
  const { toast } = useToast();
  const [approvedPapers, setApprovedPapers] = React.useState<Submission[]>([]);
  const [conferences, setConferences] = React.useState<Conference[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [allSubmissions, conferenceData] = await Promise.all([
          getSubmissions(),
          getConferences()
        ]);
        const doneSubmissions = allSubmissions.filter(s => s.status === 'Done');
        setApprovedPapers(doneSubmissions);
        setConferences(conferenceData);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Could not retrieve the list of approved papers and conferences.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toast]);
  
  const getTargetName = (submission: Submission) => {
    if (submission.submissionType === 'conference') {
        const conference = conferences.find(c => c.id === submission.targetId);
        return conference ? conference.shortTitle : submission.targetId.substring(0, 6) + '...';
    }
    // Assuming Journal name is already meaningful or handled elsewhere if needed
    return submission.targetId;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conference/Journal</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading approved papers...</TableCell>
              </TableRow>
            ) : approvedPapers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No approved papers found.</TableCell>
              </TableRow>
            ) : (
              approvedPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell className="font-mono text-xs">{getTargetName(paper)}</TableCell>
                  <TableCell className="font-medium">{paper.title}</TableCell>
                  <TableCell>{paper.fullName}</TableCell>
                  <TableCell>{new Date(paper.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Done</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

