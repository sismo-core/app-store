import { NextResponse } from "next/server";
import { ZkTelegramBotAppType, getSpaces } from "@/src/libs/spaces";
import { getUserStore } from "@/src/libs/user-store";
import env from "@/src/environments";
import axios from "axios";
import ServiceFactory from "@/src/libs/service-factory/service-factory";

type JoinRequest = {
  groupId: string;
  groupTitle: string;
  userId: string;
  username: string;
};

type Message = {
  messageId: string;
  groupId: string;
  text: string;
};

const groupIdCommand = "/groupid";


export async function POST(request: Request) {
  const logger = ServiceFactory.getLoggerService();

  const update = await request.json();
  logger.debug(`Got update: ${JSON.stringify(update)}`);
  if (isTextMessage(update)) {
    return handleMessageUpdate(await parseMessage(update));
  }
  if (isJoinRequest(update)) {
    return handleJoinRequest(await parseJoinRequest(update));
  }
  return NextResponse.json({ status: "ignored" });
}

const handleMessageUpdate = async (message: Message): Promise<Response> => {
  const logger = ServiceFactory.getLoggerService();

  if (message.text.startsWith(groupIdCommand)) {
    const messageReply = {
      messageId: message.messageId,
      groupId: message.groupId,
      text: message.groupId,
    };
    logger.debug(`Replying with message: ${JSON.stringify(messageReply)}`);
    await sendMessageReply(messageReply);
  }
  return NextResponse.json({ status: "handled" });
};

const handleJoinRequest = async (request: JoinRequest): Promise<Response> => {
  const logger = ServiceFactory.getLoggerService();
  logger.debug(
    `${request.username} (${request.userId}) requests to join ${request.groupTitle} (${request.groupId})`
  );

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
    logger.error(`Failed to approve or decline: ${error.message}`);
    return errorResponse(`Failed to approve or decline: ${error.message}`);
  }
};

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

const parseMessage = async (update: any): Promise<Message> => {
  return {
    messageId: String(update["message"]["message_id"]),
    groupId: String(update["message"]["chat"]["id"]),
    text: update["message"]["text"],
  };
};

const parseJoinRequest = async (update: any): Promise<JoinRequest> => {
  return {
    groupId: String(update["chat_join_request"]["chat"]["id"]),
    groupTitle: String(update["chat_join_request"]["chat"]["title"]),
    userId: String(update["chat_join_request"]["from"]["id"]),
    username: update["chat_join_request"]["from"]["username"],
  };
};

const isTextMessage = (update: any): boolean => {
  return update["message"] && update["message"]["text"];
};

const isJoinRequest = (update: any): boolean => {
  return update["chat_join_request"];
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

const sendMessageReply = async (message: Message): Promise<void> => {
  const sendMessageURL = new URL(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`);
  sendMessageURL.searchParams.append("chat_id", message.groupId);
  sendMessageURL.searchParams.append("reply_to_message_id", message.messageId);
  sendMessageURL.searchParams.append("text", message.text);
  if (env.isDev) {
    console.info(sendMessageURL.toString());
  }
  await axios.get(sendMessageURL.toString());
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
