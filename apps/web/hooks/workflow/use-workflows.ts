import axios from "axios";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

const API_URL = "/api";

export const apiClient = axios.create({
  baseURL: "/api/workflows",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        
        try {
          return await apiClient(originalRequest);
        } catch (retryError: any) {
          if (retryError.response?.status === 401 && typeof window !== "undefined") {
            window.location.href = "/login?error=session_expired";
            return new Promise(() => {}); // Suspend forever while navigating
          }
          return Promise.reject(retryError);
        }
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/login?error=session_expired";
          return new Promise(() => {}); // Suspend forever while navigating
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Hook to fetch all workflows using suspense
 */
export const useSuspenseWorkflows = () => {
  const [params] = useWorkflowsParams();
  
  return useSuspenseQuery({
    queryKey: ['workflows', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/workflows', { params });
      return data;
    }
  });
};

/**
 * Hook to create a new workflow
 */
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/workflows');
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Workflow "${data.name}" created`);
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to create workflow: ${error?.response?.data?.error || error.message}`);
    },
  });
};

/**
 * Hook to remove a workflow
 */
export const useRemoveWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await apiClient.delete(`/workflows/${id}`);
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Workflow "${data.name}" removed`);
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      queryClient.invalidateQueries({ queryKey: ['workflow', data.id] });
    }
  });
};

/**
 * Hook to fetch a single workflow using suspense
 */
export const useSuspenseWorkflow = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['workflow', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/workflows/${id}`);
      return data;
    }
  });
};

/**
 * Hook to update a workflow name
 */
export const useUpdateWorkflowName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data } = await apiClient.patch(`/workflows/${id}/name`, { name });
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Workflow "${data.name}" updated`);
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      queryClient.invalidateQueries({ queryKey: ['workflow', data.id] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update workflow: ${error?.response?.data?.error || error.message}`);
    },
  });
};

/**
 * Hook to update a workflow
 */
export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, nodes, edges }: { id: string; nodes: any[]; edges: any[] }) => {
      const { data } = await apiClient.put(`/workflows/${id}`, { nodes, edges });
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Workflow "${data.name}" saved`);
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      queryClient.invalidateQueries({ queryKey: ['workflow', data.id] });
    },
    onError: (error: any) => {
      toast.error(`Failed to save workflow: ${error?.response?.data?.error || error.message}`);
    },
  });
};

/**
 * Hook to execute a workflow
 */
export const useExecuteWorkflow = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await apiClient.post(`/workflows/${id}/execute`);
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Workflow "${data.name}" executed`);
    },
    onError: (error: any) => {
      toast.error(`Failed to execute workflow: ${error?.response?.data?.error || error.message}`);
    },
  });
};
