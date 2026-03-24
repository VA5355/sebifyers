import { AsyncLocalStorage } from "async_hooks";

export interface RequestContext {
  requestId: string;
  userId?: string;
  apiSession?: string;
  globalSessionToken:string;
}

export const asyncContext = new AsyncLocalStorage<RequestContext>();

export const getContext = (): RequestContext | undefined =>
  asyncContext.getStore();
