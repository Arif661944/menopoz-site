"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { refresh } from "next/cache";
import {
  checkRoadmapPassword,
  isRoadmapEditor,
  isRoadmapPasswordSet,
  ROADMAP_COOKIE,
  roadmapSessionValue,
} from "@/lib/roadmap-auth";
import {
  isRoadmapStorageReady,
  readRoadmap,
  roadmapAreas,
  roadmapStatuses,
  writeRoadmap,
  type RoadmapArea,
  type RoadmapStatus,
} from "@/lib/roadmap";

export type FormState = { error?: string; ok?: boolean };

async function requireEditor() {
  if (!(await isRoadmapEditor())) throw new Error("Bu işlem için giriş yapmalısınız.");
  if (!isRoadmapStorageReady()) throw new Error("Depolama henüz bağlanmadı.");
}

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isRoadmapPasswordSet()) return { error: "Düzenleme şifresi henüz tanımlanmadı." };
  const password = String(formData.get("password") ?? "");
  if (!checkRoadmapPassword(password)) return { error: "Şifre hatalı." };
  (await cookies()).set(ROADMAP_COOKIE, roadmapSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/yapilacaklar",
    maxAge: 60 * 60 * 24 * 30,
  });
  return { ok: true };
}

export async function logout() {
  (await cookies()).delete({ name: ROADMAP_COOKIE, path: "/yapilacaklar" });
}

export async function addItem(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isRoadmapEditor())) return { error: "Bu işlem için giriş yapmalısınız." };
  if (!isRoadmapStorageReady()) return { error: "Depolama henüz bağlanmadı; madde kaydedilemez." };

  const title = String(formData.get("title") ?? "").trim().slice(0, 140);
  const note = String(formData.get("note") ?? "").trim().slice(0, 600);
  const areaInput = String(formData.get("area") ?? "Genel");
  const area = (roadmapAreas as readonly string[]).includes(areaInput) ? (areaInput as RoadmapArea) : "Genel";
  if (!title) return { error: "Başlık boş olamaz." };

  const items = await readRoadmap();
  items.unshift({
    id: randomUUID(),
    title,
    note,
    area,
    status: "bekliyor",
    createdAt: new Date().toISOString().slice(0, 10),
  });
  await writeRoadmap(items);
  refresh();
  return { ok: true };
}

export async function setStatus(formData: FormData) {
  await requireEditor();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!(roadmapStatuses as readonly string[]).includes(status)) return;
  const items = await readRoadmap();
  const item = items.find((entry) => entry.id === id);
  if (!item) return;
  item.status = status as RoadmapStatus;
  await writeRoadmap(items);
  refresh();
}

export async function removeItem(formData: FormData) {
  await requireEditor();
  const id = String(formData.get("id") ?? "");
  const items = await readRoadmap();
  await writeRoadmap(items.filter((entry) => entry.id !== id));
  refresh();
}
