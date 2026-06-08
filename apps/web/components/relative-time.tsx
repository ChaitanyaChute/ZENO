"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

type RelativeTimeProps = {
  date: Date | string | number;
};

export function RelativeTime({ date }: RelativeTimeProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(formatDistanceToNow(date, { addSuffix: true }));
  }, [date]);

  return <span suppressHydrationWarning>{text}</span>;
}
