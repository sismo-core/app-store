
import getServerServices from "@/src/services/service-factory/server";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
      const { key } = await req.json();
      const keyValueStore = getServerServices().keyValueStore;
      const _value = keyValueStore.get(key);

      if (!_value) {
        NextResponse.error();
        return;
      }

      return NextResponse.json(_value);
    }

export async function POST (req: Request) {
      const { key, value } = await req.json();
      const keyValueStore = getServerServices().keyValueStore;

      if (!key || !value) {
        NextResponse.error();
        return;
      }

      await keyValueStore.save(key, value);
      const _value = await keyValueStore.get(key);

      if (!_value) {
        NextResponse.error();
        return;
      }
      return NextResponse.json(value);
    }