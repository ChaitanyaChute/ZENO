"use client";

import { useRouter } from "next/navigation";
import { Templates } from "../_components/workspace-pages";

export default function Page() {
	const router = useRouter();
	const setPage = (p: string) => router.push(`/${p}`);

	return <Templates setPage={setPage} />;
}
