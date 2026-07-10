import { Platform } from "react-native";
import type { DemoState } from "../data/kopoinSeed";

const API_BASE_URL = Platform.select({
  android: "http://10.0.2.2:8080/api/v1/mobile",
  ios: "http://localhost:8080/api/v1/mobile",
  default: "http://localhost:8080/api/v1/mobile",
});

type ApiPayload = {
  success: boolean;
  message?: string;
  data?: DemoState;
  checkout?: MemberCheckoutResult;
  error?: {
    message?: string;
  };
};

export type MemberCheckoutItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

export type MemberCheckoutRequest = {
  items: MemberCheckoutItem[];
  paymentMethod: string;
};

export type MemberCheckoutResult = {
  receiptNo: string;
  totalAmount: number;
  pointsEarned: number;
  balanceAfter: number;
  items: MemberCheckoutItem[];
};

async function requestState(path: string, body?: Record<string, unknown>): Promise<ApiPayload> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = (await response.json()) as ApiPayload;
  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message || "Gagal sinkronisasi data Kopoin.");
  }

  return payload;
}

export async function fetchMobileState(userId?: string): Promise<DemoState> {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
  const payload = await requestState(`/state${query}`);
  if (!payload.data) {
    throw new Error("Response state kosong.");
  }
  return payload.data;
}

export async function joinTeamRemote(userId: string): Promise<DemoState> {
  const payload = await requestState("/join-team", { userId });
  return payload.data!;
}

export async function joinCommunityRemote(userId: string, communityId: string, reason?: string): Promise<DemoState> {
  const payload = await requestState("/join-community", { userId, communityId, reason });
  return payload.data!;
}

export async function leaveCommunityRemote(userId: string, communityId: string): Promise<DemoState> {
  const payload = await requestState("/leave-community", { userId, communityId });
  return payload.data!;
}

export async function submitMissionRemote(userId: string, code: string): Promise<{ state: DemoState; message?: string }> {
  const payload = await requestState("/missions/submit", { userId, code });
  return { state: payload.data!, message: payload.message };
}

export async function redeemCouponRemote(userId: string, couponId: string): Promise<DemoState> {
  const payload = await requestState("/coupons/redeem", { userId, couponId });
  return payload.data!;
}

export async function submitVoteRemote(userId: string, optionId: string): Promise<{ state: DemoState; message?: string }> {
  const payload = await requestState("/vote", { userId, optionId });
  return { state: payload.data!, message: payload.message };
}

export async function submitMemberCheckoutRemote(
  userId: string,
  checkout: MemberCheckoutRequest,
): Promise<{ state: DemoState; message?: string; checkout: MemberCheckoutResult }> {
  const payload = await requestState("/member-checkout", { userId, ...checkout });
  if (!payload.checkout) {
    throw new Error("Response checkout kosong.");
  }

  return { state: payload.data!, message: payload.message, checkout: payload.checkout };
}
