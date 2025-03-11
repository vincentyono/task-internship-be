import jwt from "jsonwebtoken";

export const getBearerToken = (headers: Record<string, string | undefined>) => {
  if (!headers) return null;
  const result = Object.keys(headers).filter((k: string) => k === "www-authenticate")
  if (result.length === 0) return null;
  // @ts-ignore
  return headers["www-authenticate"]
}

export const verifyToken = (bearer: string) => {
  const token = bearer.replace("Bearer ", "");
  const payload = jwt.verify(token, process.env.JWT_SECRET as string);

  return payload
}
