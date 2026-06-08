"use client";
import { useState } from "react";
import { CredentialType } from "@/hooks/credentials/use-credentials";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  useCreateCredential, 
  useUpdateCredential,
  useSuspenseCredential,
} from "@/hooks/credentials/use-credentials";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum([
  CredentialType.OPENAI,
  CredentialType.ANTHROPIC,
  CredentialType.GEMINI,
]),
  value: z.string().min(1, "API key is required"),
});

type FormValues = z.infer<typeof formSchema>;

const credentialTypeOptions = [
  {
    value: CredentialType.OPENAI,
    label: "OpenAI",
    logo: "/logos/openai.svg",
  },
  {
    value: CredentialType.ANTHROPIC,
    label: "Anthropic",
    logo: "/logos/anthropic.svg",
  },
  {
    value: CredentialType.GEMINI,
    label: "Gemini",
    logo: "/logos/gemini.svg",
  },
];

interface CredentialFormProps {
  initialData?: {
    id?: string;
    name: string;
    type: CredentialType;
    value: string;
  };
};

export const CredentialForm = ({
  initialData,
}: CredentialFormProps) => {
  const router = useRouter();
  const isEdit = !!initialData?.id;
 

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: CredentialType.OPENAI,
      value: "",
    },
  });

  const [localCredentials, setLocalCredentials] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("zeno_credentials");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const updateLocalCredentials = (updatedCredentials: any[]) => {
    setLocalCredentials(updatedCredentials);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "zeno_credentials",
        JSON.stringify(updatedCredentials)
      );
    }
  };

  const onSubmit = async (values: FormValues) => {
  const credential = {
    id: crypto.randomUUID(),
    ...values,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updateLocalCredentials([...localCredentials, credential]);

  router.push("/credentials");
};

  return (
    <>
      
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>
            {isEdit ? "Edit Credential" : "Create Credential"}
          </CardTitle>
          <CardDescription>
            {isEdit
              ? "Update your API key or credential details"
              : "Add a new API key or credential to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My API key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {credentialTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={option.logo}
                                  alt={option.label}
                                  width={16}
                                  height={16}
                                />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="sk-..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={false}
                  >
                    {isEdit ? "Update" : "Create"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                  >
                    <Link href="/credentials" prefetch>
                      Cancel
                    </Link>
                  </Button>
                </div>
              </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
};

export const CredentialView = ({
  credentialId,
}: {
  credentialId: string;
}) => {
  return (
    <CredentialForm
      initialData={{
        id: credentialId,
        name: "Demo Credential",
        type: CredentialType.OPENAI,
        value: "sk-demo-key",
      }}
    />
  );
};

