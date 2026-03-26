import { useState } from "react";
import type { User } from "@zetas/types";

export function useAuth() {
  const [user, setUser] = useState<User>();
}
