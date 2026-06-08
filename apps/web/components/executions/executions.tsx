// "use client";

// import {
//   CheckCircle2Icon,
//   ClockIcon,
//   Loader2Icon,
//   XCircleIcon,
// } from "lucide-react";
// import {
//   EmptyView,
//   EntityContainer,
//   EntityHeader,
//   EntityItem,
//   EntityList,
//   EntityPagination,
//   ErrorView,
//   LoadingView,
// } from "@/components/entity-components";
// import { RelativeTime } from "@/components/relative-time";
// import type { Execution } from "@repo/database/generated/prisma";
// import { ExecutionStatus } from "@repo/database/generated/prisma";
// import { useSuspenseExecutions } from "@/hooks/executions/use-executions";
// import { useExecutionsParams } from "@/hooks/executions/use-executions-params";

// export const ExecutionsList = () => {
//   const executions = useSuspenseExecutions();

//   return (
//     <EntityList
//       items={executions.data.items}
//       getKey={(execution) => execution.id}
//       renderItem={(execution) => <ExecutionItem data={execution} />}
//       emptyView={<ExecutionsEmpty />}
//     />
//   );
// };

// export const ExecutionsHeader = () => {
//   return (
//     <EntityHeader
//       title="Executions"
//       description="View your workflow execution history"
//     />
//   );
// };

// export const ExecutionsPagination = () => {
//   const executions = useSuspenseExecutions();
//   const [params, setParams] = useExecutionsParams();

//   return (
//     <EntityPagination
//       disabled={executions.isFetching}
//       totalPages={executions.data.totalPages}
//       page={executions.data.page}
//       onPageChange={(page) => setParams({ ...params, page })}
//     />
//   );
// };

// export const ExecutionsContainer = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//     <EntityContainer
//       header={<ExecutionsHeader />}
//       pagination={<ExecutionsPagination />}
//     >
//       {children}
//     </EntityContainer>
//   );
// };

// export const ExecutionsLoading = () => {
//   return <LoadingView message="Loading executions..." />;
// };

// export const ExecutionsError = () => {
//   return <ErrorView message="Error loading executions" />;
// };

// export const ExecutionsEmpty = () => {
//   return (
//     <EmptyView message="You haven't created any executions yet. Get started by running your first workflow" />
//   );
// };

// const getStatusIcon = (status: ExecutionStatus) => {
//   switch (status) {
//     case ExecutionStatus.SUCCESS:
//       return <CheckCircle2Icon className="size-5 text-green-600" />;
//     case ExecutionStatus.FAILED:
//       return <XCircleIcon className="size-5 text-red-600" />;
//     case ExecutionStatus.RUNNING:
//       return <Loader2Icon className="size-5 text-lime-500 animate-spin" />;
//     default:
//       return <ClockIcon className="size-5 text-muted-foreground" />;
//   }
// };

// const formatStatus = (status: ExecutionStatus) => {
//   return status.charAt(0) + status.slice(1).toLowerCase();
// };

// export const ExecutionItem = ({
//   data,
// }: {
//   data: Execution & {
//     workflow: {
//       id: string;
//       name: string;
//     };
//   };
// }) => {
//   const duration = data.completedAt
//     ? Math.round(
//         (new Date(data.completedAt).getTime() -
//           new Date(data.startedAt).getTime()) /
//           1000,
//       )
//     : null;

//   const subtitle = (
//     <>
//       {data.workflow.name} &bull; Started <RelativeTime date={data.startedAt} />
//       {duration !== null && <> &bull; Took {duration}s </>}
//     </>
//   );

//   return (
//     <EntityItem
//       href={`/executions/${data.id}`}
//       title={formatStatus(data.status)}
//       subtitle={subtitle}
//       image={
//         <div className="size-8 flex items-center justify-center">
//           {getStatusIcon(data.status)}
//         </div>
//       }
//     />
//   );
// };



"use client";

import {
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  XCircleIcon,
} from "lucide-react";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { RelativeTime } from "@/components/relative-time";
// import type { Execution } from "@repo/database/generated/prisma";
// import { ExecutionStatus } from "@repo/database/generated/prisma";
import { useSuspenseExecutions } from "@/hooks/executions/use-executions";
import { useExecutionsParams } from "@/hooks/executions/use-executions-params";


type ExecutionStatus =
  | "PENDING"
  | "RUNNING"
  | "SUCCESS"
  | "FAILED";

interface Execution {
  id: string;
  status: ExecutionStatus;
  startedAt: Date | string;
  completedAt: Date | string | null;
}

export const ExecutionsList = () => {
  const executions = useSuspenseExecutions();

  return (
    <EntityList
      items={executions.data.items}
      getKey={(execution) => execution.id}
      renderItem={(execution) => <ExecutionItem data={execution} />}
      emptyView={<ExecutionsEmpty />}
    />
  );
};

export const ExecutionsHeader = () => {
  return (
    <EntityHeader
      title="Executions"
      description="View your workflow execution history"
    />
  );
};

export const ExecutionsPagination = () => {
  const executions = useSuspenseExecutions();
  const [params, setParams] = useExecutionsParams();

  return (
    <EntityPagination
      disabled={executions.isFetching}
      totalPages={executions.data.totalPages}
      page={executions.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const ExecutionsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<ExecutionsHeader />}
      pagination={<ExecutionsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const ExecutionsLoading = () => {
  return <LoadingView message="Loading executions..." />;
};

export const ExecutionsError = () => {
  return <ErrorView message="Error loading executions" />;
};

export const ExecutionsEmpty = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <EmptyView message="You haven't created any executions yet. Get started by running your first workflow" />
    </div>
  );
};

const getStatusIcon = (status: ExecutionStatus) => {
  switch (status) {
    case "SUCCESS":
      return <CheckCircle2Icon className="size-5 text-green-600" />;
    case "FAILED":
      return <XCircleIcon className="size-5 text-red-600" />;
    case "RUNNING":
      return <Loader2Icon className="size-5 text-lime-500 animate-spin" />;
    default:
      return <ClockIcon className="size-5 text-muted-foreground" />;
  }
};

const formatStatus = (status: ExecutionStatus) => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};

export const ExecutionItem = ({
  data,
}: {
  data: Execution & {
    workflow: {
      id: string;
      name: string;
    };
  };
}) => {
  const duration = data.completedAt
    ? Math.round(
        (new Date(data.completedAt).getTime() -
          new Date(data.startedAt).getTime()) /
          1000,
      )
    : null;

  const subtitle = (
    <>
      {data.workflow.name} &bull; Started <RelativeTime date={data.startedAt} />
      {duration !== null && <> &bull; Took {duration}s </>}
    </>
  );

  return (
    <EntityItem
      href={`/executions/${data.id}`}
      title={formatStatus(data.status)}
      subtitle={subtitle}
      image={
        <div className="size-8 flex items-center justify-center">
          {getStatusIcon(data.status)}
        </div>
      }
    />
  );
};
