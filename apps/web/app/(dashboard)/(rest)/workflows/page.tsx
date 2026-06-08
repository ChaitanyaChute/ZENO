// import type { SearchParams } from "nuqs/server";
// import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import {
//   WorkflowsContainer,
//   WorkflowsError,
//   WorkflowsList,
//   WorkflowsLoading,
// } from "@/features/workflows/components/workflows";
// import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
// import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
// import { requireAuth } from "@/lib/auth-utils";
// import { HydrateClient } from "@/trpc/server";

// type Props = {
//   searchParams: Promise<SearchParams>;
// };

// const Page = async ({ searchParams }: Props) => {
//   await requireAuth();

//   const params = await workflowsParamsLoader(searchParams);
//   prefetchWorkflows(params);

//   return (
//     <WorkflowsContainer>
//       <HydrateClient>
//         <ErrorBoundary fallback={<WorkflowsError />}>
//           <Suspense fallback={<WorkflowsLoading />}>
//             <WorkflowsList />
//           </Suspense>
//         </ErrorBoundary>
//       </HydrateClient>
//     </WorkflowsContainer>
//   );
// };

// export default Page;


// import Link from "next/link";
// import { PlusIcon, PlayCircleIcon, MoreVerticalIcon, CheckCircle2Icon, ClockIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { WorkflowGenerator } from "@/components/workflow-generator";

// const workflows = [
//   {
//     id: "workflow-1",
//     name: "Lead Sync to Salesforce",
//     description: "Automatically syncs new Webflow leads to Salesforce CRM.",
//     status: "active",
//     lastRun: "2 mins ago",
//     runs: 1432,
//   },
//   {
//     id: "workflow-2",
//     name: "Weekly Analytics Report",
//     description: "Compiles Google Analytics data and posts to Slack channel.",
//     status: "active",
//     lastRun: "1 week ago",
//     runs: 52,
//   },
//   {
//     id: "workflow-3",
//     name: "Customer Onboarding Email",
//     description: "Sends a welcome sequence to new Stripe subscribers.",
//     status: "draft",
//     lastRun: "Never",
//     runs: 0,
//   },
// ];

// const Page = async () => {
//   return (
//     <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
//             Workflows
//           </h1>
//           <p className="text-neutral-400">
//             Manage and monitor your automated processes.
//           </p>
//         </div>

//         <Link href="/workflows/new">
//           <Button className="bg-lime-500 hover:bg-lime-600 text-neutral-950 font-semibold gap-2 shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]">
//             <PlusIcon className="w-4 h-4" />
//             New Workflow
//           </Button>
//         </Link>
//       </div>

//       <div className="p-6">
//   <WorkflowGenerator />

//   <div className="mb-6 flex items-center justify-between">
//     ...
//   </div>
// </div>


//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {workflows.map((workflow) => (
//           <Link
//             key={workflow.id}
//             href={`/workflows/${workflow.id}`}
//             className="group block relative rounded-2xl bg-neutral-900/40 backdrop-blur-md border border-neutral-800/50 p-6 hover:bg-neutral-800/50 hover:border-lime-500/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
//           >
//             {/* Subtle top glow on hover */}
//             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-500/0 to-transparent group-hover:via-lime-500/50 transition-all duration-500" />
            
//             <div className="flex justify-between items-start mb-4">
//               <div className="p-2.5 rounded-xl bg-neutral-800/80 text-neutral-300 group-hover:text-lime-500 group-hover:bg-lime-500/10 transition-colors">
//                 <PlayCircleIcon className="w-6 h-6" />
//               </div>
//               <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white -mr-2 -mt-2">
//                 <MoreVerticalIcon className="w-4 h-4" />
//               </Button>
//             </div>

//             <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors">
//               {workflow.name}
//             </h2>
            
//             <p className="text-sm text-neutral-400 mb-6 line-clamp-2 min-h-[40px]">
//               {workflow.description}
//             </p>

//             <div className="flex items-center justify-between pt-4 border-t border-neutral-800/50 text-xs text-neutral-500">
//               <div className="flex items-center gap-1.5">
//                 {workflow.status === "active" ? (
//                   <>
//                     <CheckCircle2Icon className="w-3.5 h-3.5 text-lime-500" />
//                     <span className="text-lime-500 font-medium">Active</span>
//                   </>
//                 ) : (
//                   <>
//                     <ClockIcon className="w-3.5 h-3.5" />
//                     <span>Draft</span>
//                   </>
//                 )}
//               </div>
//               <span>{workflow.runs.toLocaleString()} runs</span>
//             </div>
//           </Link>
//         ))}
//       </div>
      
//       {workflows.length === 0 && (
//         <div className="text-center py-20 bg-neutral-900/20 border border-neutral-800/50 border-dashed rounded-2xl">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800/50 mb-4">
//             <PlayCircleIcon className="w-8 h-8 text-neutral-500" />
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">No workflows yet</h3>
//           <p className="text-neutral-400 mb-6 max-w-sm mx-auto">
//             Create your first workflow to start automating your tasks across your favorite apps.
//           </p>
//           <Link href="/workflows/new">
//             <Button className="bg-white hover:bg-neutral-200 text-black">
//               Create your first workflow
//             </Button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;


import { redirect } from "next/navigation";
import { PlusIcon, PlayCircleIcon, MoreVerticalIcon, CheckCircle2Icon, ClockIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WorkflowGenerator } from "@/components/workflow-generator";
import { formatDistanceToNow } from "date-fns";

const Page = async () => {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";

  let workflows: any[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/workflows`, {
      headers: { cookie: cookieStr },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      workflows = data.items || [];
    }
  } catch (error) {
    console.error("Failed to fetch workflows", error);
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Workflows
          </h1>

          <p className="text-neutral-400">
            Manage and monitor your automated processes.
          </p>
        </div>

        <Link href="/workflows/new">
          <Button className="bg-lime-500 hover:bg-lime-600 text-neutral-950 font-semibold gap-2 shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]">
            <PlusIcon className="w-4 h-4" />
            New Workflow
          </Button>
        </Link>
      </div>

      {/* AI Workflow Generator */}
      <WorkflowGenerator />

      <div className="mb-8" />

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Link
            key={workflow.id}
            href={`/workflows/${workflow.id}`}
            className="group block relative rounded-2xl bg-neutral-900/40 backdrop-blur-md border border-neutral-800/50 p-6 hover:bg-neutral-800/50 hover:border-lime-500/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
          >
            {/* Top Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-500/0 to-transparent group-hover:via-lime-500/50 transition-all duration-500" />

            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-neutral-800/80 text-neutral-300 group-hover:text-lime-500 group-hover:bg-lime-500/10 transition-colors">
                <PlayCircleIcon className="w-6 h-6" />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-500 hover:text-white -mr-2 -mt-2"
              >
                <MoreVerticalIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Workflow Name */}
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors">
              {workflow.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-neutral-400 mb-6 line-clamp-2 min-h-[40px]">
              {workflow.id} - Created {formatDistanceToNow(new Date(workflow.createdAt || Date.now()), { addSuffix: true })}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/50 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2Icon className="w-3.5 h-3.5 text-lime-500" />
                <span className="text-lime-500 font-medium">
                  Active
                </span>
              </div>

              <span>Last updated: {formatDistanceToNow(new Date(workflow.updatedAt || Date.now()), { addSuffix: true })}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {workflows.length === 0 && (
        <div className="text-center py-20 bg-neutral-900/20 border border-neutral-800/50 border-dashed rounded-2xl mt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800/50 mb-4">
            <PlayCircleIcon className="w-8 h-8 text-neutral-500" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            No workflows yet
          </h3>

          <p className="text-neutral-400 mb-6 max-w-sm mx-auto">
            Create your first workflow to start automating your
            tasks across your favorite apps.
          </p>

          <Link href="/workflows/new">
            <Button className="bg-white hover:bg-neutral-200 text-black">
              Create your first workflow
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;