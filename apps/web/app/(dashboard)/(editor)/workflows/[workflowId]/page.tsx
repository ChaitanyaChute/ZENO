import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/components/editor/editor";
import { EditorHeader } from "@/components/editor/editor-header";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { workflowId } = await params;

  return (
    <ErrorBoundary fallback={<EditorError />}>
      <Suspense fallback={<EditorLoading />}>
        <EditorHeader workflowId={workflowId} />
        <main className="flex-1 h-full">
          <Editor workflowId={workflowId} />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;