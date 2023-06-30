import { NextResponse } from "next/server";
import { ZkTelegramBotAppType, getSpaces } from "@/src/libs/spaces";
import { getUserStore } from "@/src/libs/user-store";
import env from "@/src/environments";
import axios from "axios";

type JoinRequest = {
  groupId: string;
  groupTitle: string;
  userId: string;
  username: string;
};

export async function POST(req: Request) {
  const request = await parseJoinRequest(req);
  if (env.isDev) {
    console.info(
      `${request.username} (${request.userId}) requests to join ${request.groupTitle} (${request.groupId})`
    );
  }

  const app = findApp(request.groupId);
  if (!app) {
    return errorResponse("Failed to find a matching app for the group");
  }

  const canJoinGroup = env.isDemo ? true : await isWhitelistApproved(app, request.userId);
  try {
    if (canJoinGroup) {
      await approve(request);
    } else {
      await decline(request);
    }
    return approvedResponse(canJoinGroup);
  } catch (error) {
    if (env.isDev) {
      console.error(error.message);
    }
    return errorResponse(`Failed to approve or decline: ${error.message}`);
  }
}

const findApp = (groupId: string): ZkTelegramBotAppType | undefined => {
  const spaces = getSpaces();
  for (let space of spaces) {
    for (let app of space.apps) {
      if (app.type === "zkTelegramBot") {
        const zkBotApp = app as ZkTelegramBotAppType;
        if (zkBotApp.telegramGroupId === groupId || zkBotApp.telegramGroupId === groupId) {
          return app;
        }
      }
    }
  }
};

const parseJoinRequest = async (req: Request): Promise<JoinRequest> => {
  const requestData = await req.json();
  return {
    groupId: String(requestData["chat_join_request"]["chat"]["id"]),
    groupTitle: String(requestData["chat_join_request"]["chat"]["title"]),
    userId: String(requestData["chat_join_request"]["from"]["id"]),
    username: requestData["chat_join_request"]["from"]["username"],
  };
};

const isWhitelistApproved = async (
  app: ZkTelegramBotAppType,
  telegramId: string
): Promise<boolean> => {
  const store = getUserStore();
  const result = await store.getUsers({
    appSlug: app.slug,
    userId: telegramId,
  });
  return result.length > 0;
};

const approve = async (request: JoinRequest): Promise<void> => {
  const approveURL = new URL(
    `https://api.telegram.org/bot${env.telegramBotToken}/approveChatJoinRequest`
  );
  approveURL.searchParams.append("chat_id", request.groupId);
  approveURL.searchParams.append("user_id", request.userId);
  if (env.isDev) {
    console.info(approveURL.toString());
  }
  await axios.get(approveURL.toString());
};

const decline = async (request: JoinRequest): Promise<void> => {
  const declineURL = new URL(
    `https://api.telegram.org/bot${env.telegramBotToken}/declineChatJoinRequest`
  );
  declineURL.searchParams.append("chat_id", request.groupId);
  declineURL.searchParams.append("user_id", request.userId);
  if (env.isDev) {
    console.info(declineURL.toString());
  }
  await axios.get(declineURL.toString());
};

const approvedResponse = (approved: boolean): Response => {
  if (env.isDev) {
    console.info(`Approved: ${approved}`);
  }
  return NextResponse.json({ status: approved ? "approved" : "declined" });
};

const errorResponse = (message: string): Response => {
  if (env.isDev) {
    console.error(message);
  }
  return NextResponse.json({ status: "error", message: message });
};
