import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ROADMAP_COOKIE = "yapilacaklar_oturum";

function sessionToken(password: string) {
  return createHmac("sha256", password).update("yapilacaklar-oturum").digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isRoadmapPasswordSet() {
  return Boolean(process.env.YAPILACAKLAR_SIFRE);
}

export function checkRoadmapPassword(candidate: string) {
  const password = process.env.YAPILACAKLAR_SIFRE;
  return Boolean(password) && safeEqual(candidate, password!);
}

export function roadmapSessionValue() {
  return sessionToken(process.env.YAPILACAKLAR_SIFRE!);
}

export async function isRoadmapEditor() {
  const password = process.env.YAPILACAKLAR_SIFRE;
  if (!password) return false;
  const value = (await cookies()).get(ROADMAP_COOKIE)?.value;
  return Boolean(value) && safeEqual(value!, sessionToken(password));
}
