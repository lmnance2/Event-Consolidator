import {cache} from "react"
import {cookies} from "next/headers"
import { getUserFromSession } from "../core/session";

export const getCurrentUser = cache(async () => {
  return await getUserFromSession(await cookies());
});

