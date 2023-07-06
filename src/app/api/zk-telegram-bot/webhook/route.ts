import { NextResponse } from "next/server";
import { ZkTelegramBotAppType, getSpaces } from "@/src/libs/spaces";
import env from "@/src/environments";
import ServiceFactory from "@/src/libs/service-factory/service-factory";

const groupIdCommand = "/groupid";

export async function POST(request: Request) {
  const logger = ServiceFactory.getLoggerService();
  const telegramBotService = ServiceFactory.getTelegramBotService();

  const update = await request.json();
  const message = telegramBotService.parseMessage(update);
  if (message) {
    if (message.text.startsWith(groupIdCommand)) {
      const messageReply = {
        messageId: message.messageId,
        groupId: message.groupId,
        text: message.groupId,
      };
      logger.debug(`Replying with message: ${JSON.stringify(messageReply)}`);
      await telegramBotService.sendMessage(messageReply);
    }
    return NextResponse.json({ status: "handled" });
  }

  const joinRequest = telegramBotService.parseJoinRequest(update);
  if (joinRequest) {
    const logger = ServiceFactory.getLoggerService();
    logger.debug(
      `${joinRequest.username} (${joinRequest.userId}) joinRequests to join ${joinRequest.groupTitle} (${joinRequest.groupId})`
    );

    const app = findApp(joinRequest.groupId);
    if (!app) {
      return errorResponse("Failed to find a matching app for the group");
    }

    try {
      const canJoinGroup = await isWhitelistApproved(app, joinRequest.userId);
      if (canJoinGroup) {
        await telegramBotService.approveChatJoinRequest(joinRequest);
        logger.debug(`Approved: ${canJoinGroup}`);
        return NextResponse.json({ status: "approved" });
      } else {
        await telegramBotService.declineChatJoinRequest(joinRequest);
        logger.debug(`Declined: ${canJoinGroup}`);
        return NextResponse.json({ status: "declined" });
      }
    } catch (error) {
      logger.error(`Failed to approve or decline: ${error.message}`);
      return errorResponse(`Failed to approve or decline: ${error.message}`);
    }
  }
  return NextResponse.json({ status: "ignored" });
}

const findApp = (groupId: string): ZkTelegramBotAppType | undefined => {
  const spaces = getSpaces();
  for (let space of spaces) {
    for (let app of space.apps) {
      if (app.type === "zkTelegramBot") {
        const zkBotApp = app as ZkTelegramBotAppType;
        if (zkBotApp.telegramGroupId === groupId) {
          return app;
        }
      }
    }
  }
};

const isWhitelistApproved = async (
  app: ZkTelegramBotAppType,
  telegramId: string
): Promise<boolean> => {
  const userStore = ServiceFactory.getZkTelegramBotUserStore();
  const result = await userStore.exists({
    appSlug: app.slug,
    userId: telegramId.toString(),
  });
  return result;
};

const errorResponse = (message: string): Response => {
  if (env.isDev) {
    console.error(message);
  }
  return NextResponse.json({ status: "error", message: message });
};
